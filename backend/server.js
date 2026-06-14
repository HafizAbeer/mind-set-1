const path = require("path");
// The .env lives at the repo root (Vercel runs the function from there). Load
// it explicitly so the backend also works when run from the backend/ dir.
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { validateEnv } = require("./config/env");
validateEnv();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const statisticsRoutes = require("./routes/statisticsRoutes");
const connectDB = require("./config/db");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Trust one proxy hop (Vercel) so req.ip reflects the client for rate limiting.
app.set("trust proxy", 1);

// Security headers. This server is a JSON API (the SPA is served by a separate
// frontend project), so CSP is irrelevant here; allow cross-origin resource use.
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// CORS allowlist: configured origins + localhost (dev) + *.vercel.app previews.
// Same-origin/proxied and non-browser requests (no Origin header) are allowed.
const allowedOrigins = (process.env.CORS_ORIGINS || process.env.FRONTEND_URL || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      if (/^http:\/\/localhost(:\d+)?$/.test(origin)) return callback(null, true);
      if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) {
        return callback(null, true);
      }
      if (/^https:\/\/[a-z0-9-]+\.onrender\.com$/i.test(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json()); // Parses JSON bodies

// Connect to Database (cached/reused across warm serverless invocations)
connectDB().catch((err) =>
  console.error("DB connection error:", err.message),
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api", statisticsRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Mindset Auth API is running.");
});

// JSON 404 + central error handler (must be registered last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// Listen when run directly (local dev, Render web service). When imported as a
// serverless handler (Vercel's api/index.js), require.main !== module, so we
// only export the app below instead of binding a port.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
