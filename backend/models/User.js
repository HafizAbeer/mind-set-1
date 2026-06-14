const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: false,
      enum: ["Male", "Female"],
    },
    role: {
      type: String,
      required: true,
      enum: ["User", "Therapist"],
      default: "User",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: null,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    // Set whenever the password changes; used to invalidate JWTs issued
    // before the change (see authMiddleware.protect).
    passwordChangedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // Subtract 1s so a token signed immediately after this save isn't
  // invalidated by sub-second clock skew between save and sign.
  this.passwordChangedAt = new Date(Date.now() - 1000);
});

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// True if the password changed after the given JWT "iat" (issued-at, seconds).
userSchema.methods.passwordChangedAfter = function (jwtIatSeconds) {
  if (!this.passwordChangedAt || !jwtIatSeconds) {
    return false;
  }
  const changedAtSeconds = Math.floor(this.passwordChangedAt.getTime() / 1000);
  return jwtIatSeconds < changedAtSeconds;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
