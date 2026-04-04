require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON bodies

// Connect to Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Mindset Auth API is running.");
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
