const User = require("../models/User");
const jwt = require("jsonwebtoken");

const sendEmail = require("../utils/sendEmail");

// Generate JWT Helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, gender, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const user = await User.create({
      name,
      email,
      password,
      gender,
      role,
      verificationCode,
    });

    if (user) {
      // Send verification email
      try {
        await sendEmail({
          email: user.email,
          subject: "Your Mindset Verification Code",
          message: `Hello ${user.name},\n\nYour verification code is: ${verificationCode}\n\nPlease enter this code to verify your account.`,
        });
      } catch (err) {
        console.error("Email sending failed:", err);
        // We will continue even if email fails for testing, but ideally we'd log it
      }

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        gender: user.gender,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token (Login)
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (!user.isVerified) {
        return res.status(403).json({
          message: "Please verify your email address first.",
          isVerified: false,
          email: user.email,
        });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify Email / Pin
// @route   POST /api/auth/verify
exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verificationCode === code) {
      user.isVerified = true;
      user.verificationCode = null; // clear after verify
      await user.save();
      res.json({ message: "Email verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid verification code" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "No account with that email found" });
    }

    // Generate a PIN
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = resetCode;
    await user.save();

    // Send email
    try {
      await sendEmail({
        email: user.email,
        subject: "Mindset Password Reset PIN",
        message: `Hello ${user.name},\n\nYou requested a password reset. Your PIN is: ${resetCode}\n\nPlease enter this code to reset your password.`,
      });
      res.json({ message: "Password reset PIN sent to email" });
    } catch (err) {
      console.error("Email sending failed:", err);
      res.json({
        message:
          "Password reset PIN generated. (Email integration may be pending)",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ message: "Invalid reset PIN" });
    }

    // Update password
    user.password = newPassword;
    user.verificationCode = null; // Clear PIN
    await user.save();

    res.json({ message: "Password reset successfully. You can now login." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
