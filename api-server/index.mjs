import "dotenv/config";
import express from "express";
import cors from "cors";
import { Pool } from "pg";
import { clerkMiddleware, getAuth, clerkClient } from "@clerk/express";


const app = express();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ),
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD ), // force string
  database: process.env.DB_NAME,
   ssl: {
    rejectUnauthorized: false, // needed on Render/Railway
  },
});

pool.connect()
  .then(() => console.log("✅ Connected to Postgres"))
  .catch((err) => console.error("❌ DB connection error:", err));

const PORT = process.env.PORT || 4000;

// ----------- CORS -----------
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://parentingautismtogether.in",
  "https://www.parentingautismtogether.in",
];
app.use((req, res, next) => { res.header("Vary", "Origin"); next(); });
app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true); // allow curl/postman
    return allowedOrigins.includes(origin)
      ? cb(null, true)
      : cb(new Error("CORS: origin not allowed"));
  },
  methods: ["GET","HEAD","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization","Accept","X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use(express.json());
app.use(clerkMiddleware());

// helper: ensure a profile row exists for this Clerk user
async function ensureProfile(clerkUserId, displayName = null) {
  if(displayName == null) {
        const u = await clerkClient.users.getUser(clerkUserId);
    displayName =
    u?.firstName?.trim() ||
    u?.username?.trim() ||
    u?.primaryEmailAddress?.emailAddress ||
    "Anonymous";

  }
   

  await pool.query(
    `INSERT INTO profiles (clerk_user_id, display_name)
     VALUES ($1, $2)
     ON CONFLICT (clerk_user_id) DO NOTHING`,
    [clerkUserId, displayName]
  );
}

// middleware for API-only auth (no redirect)
function requireUser(req, res, next) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  req.userId = userId;
  next();
}

// ---------- Routes ----------
app.post("/api/protected", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  // 👉 You can verify token here if using Clerk or JWT

  return res.json({ ok: true, message: "You are authorized!", token });
});

// List questions (with search/tag + pagination)
app.get("/api/qa/questions", async (req, res) => {
  const { q, tag, page = 1, limit = 10, sort = "new" } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  const where = [];
  const params = [];
  let i = 1;

  if (q) {
    where.push("(title ILIKE $" + i + " OR body ILIKE $" + i + ")");
    params.push(`%${q}%`); i++;
  }
  if (tag) {
    where.push(`$${i} = ANY(tags)`); params.push(tag); i++;
  }

  const whereSql = where.length ? "WHERE " + where.join(" AND ") : "";
  const orderSql =
    sort === "votes" ? "ORDER BY votes_count DESC, created_at DESC" :
    sort === "active" ? "ORDER BY updated_at DESC" :
    "ORDER BY created_at DESC";

  const sql = `
    SELECT q.*, 
           jsonb_build_object('clerk_user_id', p.clerk_user_id, 'display_name', p.display_name) AS author
    FROM questions q
    LEFT JOIN profiles p ON p.clerk_user_id = q.author_clerk_id
    ${whereSql}
    ${orderSql}
    LIMIT $${i} OFFSET $${i+1};
  `;
  params.push(Number(limit), offset);

  const { rows } = await pool.query(sql, params);
  res.json(rows);
});

// Get single question with answers
app.get("/api/qa/questions/:id", async (req, res) => {
  const { id } = req.params;

  const qRes = await pool.query(
    `SELECT q.*,
            jsonb_build_object('clerk_user_id', p.clerk_user_id, 'display_name', p.display_name) AS author
     FROM questions q
     LEFT JOIN profiles p ON p.clerk_user_id = q.author_clerk_id
     WHERE q.id = $1`,
    [id]
  );
  if (!qRes.rowCount) return res.status(404).json({ error: "Not found" });
  const question = qRes.rows[0];

  const aRes = await pool.query(
    `SELECT a.*,
            jsonb_build_object('clerk_user_id', p.clerk_user_id, 'display_name', p.display_name) AS author
     FROM answers a
     LEFT JOIN profiles p ON p.clerk_user_id = a.author_clerk_id
     WHERE a.question_id = $1
     ORDER BY is_accepted DESC, votes_count DESC, created_at ASC`,
    [id]
  );

  res.json({ question, answers: aRes.rows });
});

// Ask question
app.post("/api/qa/questions", requireUser, async (req, res) => {
  const { userId } = req;
  const { title, body, tags = [] } = req.body;

  if (!title?.trim() || !body?.trim()) {
    return res.status(400).json({ error: "title and body are required" });
  }
const u = await clerkClient.users.getUser(userId);
  const displayName =
    u?.firstName?.trim() ||
    u?.username?.trim() ||
    u?.primaryEmailAddress?.emailAddress ||
    "Anonymous";

 await ensureProfile(userId, displayName); // ✅ fixed

  const { rows } = await pool.query(
    `INSERT INTO questions (title, body, tags, author_clerk_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title.trim(), body.trim(), tags, userId]
  );
  res.status(201).json(rows[0]);
});

// Answer a question
app.post("/api/qa/questions/:id/answers", requireUser, async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  const { body } = req.body;

  if (!body?.trim()) return res.status(400).json({ error: "body required" });
  await ensureProfile(userId);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const a = await client.query(
      `INSERT INTO answers (question_id, body, author_clerk_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [id, body.trim(), userId]
    );
    await client.query(
      `UPDATE questions SET answers_count = answers_count + 1, updated_at = NOW() WHERE id = $1`,
      [id]
    );
    await client.query("COMMIT");
    res.status(201).json(a.rows[0]);
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
});

// Accept an answer (only question owner)
app.post("/api/qa/questions/:id/accept/:answerId", requireUser, async (req, res) => {
  const { userId } = req;
  const { id, answerId } = req.params;

  // check owner
  const q = await pool.query(`SELECT author_clerk_id FROM questions WHERE id=$1`, [id]);
  if (!q.rowCount) return res.status(404).json({ error: "Question not found" });
  if (q.rows[0].author_clerk_id !== userId) return res.status(403).json({ error: "Not your question" });

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(`UPDATE answers SET is_accepted = FALSE WHERE question_id = $1`, [id]);
    const upd = await client.query(
      `UPDATE answers SET is_accepted = TRUE, updated_at = NOW()
       WHERE id = $1 AND question_id = $2
       RETURNING id`,
      [answerId, id]
    );
    if (!upd.rowCount) throw new Error("Answer not found for this question");
    await client.query(`UPDATE questions SET accepted_answer_id = $1, updated_at = NOW() WHERE id = $2`, [answerId, id]);
    await client.query("COMMIT");
    res.json({ ok: true, accepted_answer_id: answerId });
  } catch (e) {
    await client.query("ROLLBACK");
    res.status(400).json({ error: e.message });
  } finally {
    client.release();
  }
});

// Vote question (+1/-1)
app.post("/api/qa/questions/:id/vote", requireUser, async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  const { value } = req.body; // 1 | -1
  if (![1, -1].includes(Number(value))) return res.status(400).json({ error: "value must be 1 or -1" });
  await ensureProfile(userId);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      `INSERT INTO question_votes (question_id, voter_clerk_id, value)
       VALUES ($1, $2, $3)
       ON CONFLICT (question_id, voter_clerk_id)
       DO UPDATE SET value = EXCLUDED.value`,
      [id, userId, Number(value)]
    );
    const vc = await client.query(
      `UPDATE questions
         SET votes_count = COALESCE((SELECT COALESCE(SUM(value),0) FROM question_votes WHERE question_id = $1),0)
       WHERE id = $1
       RETURNING votes_count`,
      [id]
    );
    await client.query("COMMIT");
    res.json({ votes_count: vc.rows[0].votes_count });
  } catch (e) {
    await client.query("ROLLBACK");
    res.status(400).json({ error: e.message });
  } finally {
    client.release();
  }
});

// Vote answer (+1/-1)
app.post("/api/qa/answers/:id/vote", requireUser, async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  const { value } = req.body;
  if (![1, -1].includes(Number(value))) return res.status(400).json({ error: "value must be 1 or -1" });
  await ensureProfile(userId);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      `INSERT INTO answer_votes (answer_id, voter_clerk_id, value)
       VALUES ($1, $2, $3)
       ON CONFLICT (answer_id, voter_clerk_id)
       DO UPDATE SET value = EXCLUDED.value`,
      [id, userId, Number(value)]
    );
    const vc = await client.query(
      `UPDATE answers
         SET votes_count = COALESCE((SELECT COALESCE(SUM(value),0) FROM answer_votes WHERE answer_id = $1),0),
             updated_at = NOW()
       WHERE id = $1
       RETURNING votes_count`,
      [id]
    );
    await client.query("COMMIT");
    res.json({ votes_count: vc.rows[0].votes_count });
  } catch (e) {
    await client.query("ROLLBACK");
    res.status(400).json({ error: e.message });
  } finally {
    client.release();
  }
});

app.get("/api/dbtest", async (req, res) => {
  try {
    const result = await pool.query("SELECT now()");
    res.json({ ok: true, time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get('/activities', async (req, res) => {
  const lang = req.query.lang || 'en';

  try {
    const result = await pool.query(
      'SELECT public.get_home_activities_json($1) AS data',
      [lang]
    );
    res.json(result.rows[0].data);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/government-schemes', async (req, res) => {
  const lang = req.query.lang || 'en';

  try {
    const result = await pool.query(
      'SELECT * FROM public.get_government_schemes_by_lang($1)',
      [lang]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching government schemes:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/ping', (req, res) => {
  res.send('Api is running');
  console.log('✅ DB Host:', process.env.DB_HOST);
  console.log('✅ DB Port:', process.env.DB_PORT);
  console.log('✅ DB User:', process.env.DB_USER);
  console.log('✅ NODE_ENV:', process.env.NODE_ENV);

});


app.get('/stories', async (req, res) => {
  const lang = req.query.lang || 'en';

   try {
    const { rows } = await pool.query("SELECT get_stories_by_lang($1) AS data", [req.query.lang]);
    
    // Flatten and map the response
    const formatted = rows[0].data.map(story => ({
      id: story.id,
      title: story.title,
      imageUrl: story.imageUrl, // or replace with thumbnail if needed
      steps: story.steps.map(step => ({
        id: step.id,
        caption: step.caption,
        imageUrl: step.imageUrl
      }))
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});



app.listen(PORT, () => {
  if (!process.env.CLERK_SECRET_KEY?.startsWith("sk_")) {
    console.error("CLERK_SECRET_KEY missing or invalid (must start with sk_)");
  }
  console.log(`Q&A API on http://localhost:${PORT}`);
});


