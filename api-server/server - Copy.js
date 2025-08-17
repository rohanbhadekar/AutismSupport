// server.mjs
import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth, getAuth } from "@clerk/express";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

// Attach Clerk middleware (gives you req.auth for signed-in users)
app.use(clerkMiddleware());

// Health
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    authPreview: req.auth ? Object.keys(req.auth) : [],
  });
});

// Open route
app.get("/api/open", (_req, res) => res.json({ message: "OPEN ✅" }));

// Protected route (redirects unauthenticated to sign-in; better for same-origin apps)
app.get("/api/protected", requireAuth(), (req, res) => {
  const { userId, sessionId } = req.auth;
  res.json({ message: "PROTECTED ✅", userId, sessionId });
});

// Example API-style auth (no redirect): check token and return 401/403 yourself
app.get("/api/me", (req, res) => {
  const { userId } = getAuth(req); // safe for API responses
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  res.json({ userId });
});

app.listen(PORT, () => console.log(`API running http://localhost:${PORT}`));
