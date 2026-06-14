const path = require("path");
// The .env lives at the repo root (Vercel runs the function from there). Load
// it explicitly so the backend also works when run from the backend/ dir.
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { validateEnv } = require("./config/env");
validateEnv();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON bodies

// Connect to Database (cached/reused across warm serverless invocations)
connectDB().catch((err) =>
  console.error("DB connection error:", err.message),
);

// Routes
app.use("/api/auth", authRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Mindset Auth API is running.");
});

// JSON 404 + central error handler (must be registered last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
