const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());

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



const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});