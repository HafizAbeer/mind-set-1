const express = require("express");
const router = express.Router();
const {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { authLimiter } = require("../middleware/rateLimit");

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/verify", authLimiter, verifyEmail);
router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/reset-password", authLimiter, resetPassword);

module.exports = router;
