const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Embedded 1:1 preferences (Settings → Notifications + Language/Region).
// Defaults mean users created before this change read sane values.
const preferencesSchema = new mongoose.Schema(
  {
    notifications: {
      calendar: { type: Boolean, default: true },
      dialogues: { type: Boolean, default: true },
      weekly: { type: Boolean, default: false },
      // Off until a real push pipeline exists — the toggle only persists intent.
      push: { type: Boolean, default: false },
    },
    language: { type: String, enum: ["en", "de", "es"], default: "en" },
    region: { type: String, enum: ["US", "DE", "GB"], default: "US" },
  },
  { _id: false },
);

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
    preferences: {
      type: preferencesSchema,
      default: () => ({}),
    },
    // Email change is verified out-of-band: a code is sent to the NEW address
    // and the live email is only swapped once it is confirmed.
    pendingEmail: { type: String, default: null },
    pendingEmailCode: { type: String, default: null },
    pendingEmailCodeExpire: { type: Date, default: null },
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
