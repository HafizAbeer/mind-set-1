const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

const sixDigitCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Shape returned to the client. plan/subscriptionStatus default until the
// paywall adds those fields (then they hydrate automatically).
function publicUser(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    gender: user.gender,
    isVerified: user.isVerified,
    preferences: user.preferences,
    pendingEmail: user.pendingEmail || null,
    plan: user.plan || "free",
    subscriptionStatus: user.subscriptionStatus || "none",
  };
}

// @desc   Current user profile + preferences
// @route  GET /api/user/me
exports.getMe = asyncHandler(async (req, res) => {
  res.json(publicUser(req.user));
});

// @desc   Update display name
// @route  PATCH /api/user/me/profile
exports.updateProfile = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Name is required" });
  }
  if (name.trim().length > 100) {
    return res.status(400).json({ message: "Name is too long" });
  }
  req.user.name = name.trim();
  await req.user.save();
  res.json(publicUser(req.user));
});

// @desc   Update notification toggles + language/region
// @route  PATCH /api/user/me/preferences
exports.updatePreferences = asyncHandler(async (req, res) => {
  const { notifications, language, region } = req.body;
  // Dot-notation $set: Mongoose does NOT deep-merge subdocs, so assigning the
  // whole notifications object would drop unspecified keys.
  const set = {};

  if (notifications && typeof notifications === "object") {
    for (const key of ["calendar", "dialogues", "weekly", "push"]) {
      if (key in notifications) {
        if (typeof notifications[key] !== "boolean") {
          return res
            .status(400)
            .json({ message: `notifications.${key} must be a boolean` });
        }
        set[`preferences.notifications.${key}`] = notifications[key];
      }
    }
  }
  if (language !== undefined) {
    if (!["en", "de", "es"].includes(language)) {
      return res.status(400).json({ message: "Invalid language" });
    }
    set["preferences.language"] = language;
  }
  if (region !== undefined) {
    if (!["US", "DE", "GB"].includes(region)) {
      return res.status(400).json({ message: "Invalid region" });
    }
    set["preferences.region"] = region;
  }

  if (Object.keys(set).length === 0) {
    return res
      .status(400)
      .json({ message: "No valid preference fields provided" });
  }

  const updated = await User.findByIdAndUpdate(
    req.user._id,
    { $set: set },
    { new: true, runValidators: true },
  ).select("-password");

  res.json({ preferences: updated.preferences });
});

// @desc   Start an email change (sends a code to the NEW address)
// @route  POST /api/user/me/email/request
exports.requestEmailChange = asyncHandler(async (req, res) => {
  const { newEmail } = req.body;
  if (!newEmail || !EMAIL_REGEX.test(newEmail)) {
    return res.status(400).json({ message: "A valid email is required" });
  }
  const normalized = newEmail.toLowerCase().trim();
  if (normalized === req.user.email.toLowerCase()) {
    return res.status(400).json({ message: "That is already your email" });
  }
  const existing = await User.findOne({ email: normalized });
  if (existing) {
    return res.status(409).json({ message: "Email already in use" });
  }

  const code = sixDigitCode();
  req.user.pendingEmail = normalized;
  req.user.pendingEmailCode = code;
  req.user.pendingEmailCodeExpire = new Date(Date.now() + 15 * 60 * 1000);
  await req.user.save();

  try {
    await sendEmail({
      email: normalized,
      subject: "Confirm your new Mindset email",
      message: `Your email change code is: ${code}\n\nIt expires in 15 minutes. If you didn't request this, ignore this message.`,
    });
  } catch (err) {
    console.error("Email change code send failed:", err.message);
  }

  res.json({
    message: "A confirmation code has been sent to the new email address.",
  });
});

// @desc   Confirm the email change with the code
// @route  POST /api/user/me/email/confirm
exports.confirmEmailChange = asyncHandler(async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ message: "Code is required" });
  }
  if (!req.user.pendingEmail || !req.user.pendingEmailCode) {
    return res.status(400).json({ message: "No pending email change" });
  }
  if (
    req.user.pendingEmailCodeExpire &&
    req.user.pendingEmailCodeExpire < new Date()
  ) {
    return res.status(400).json({ message: "Code has expired" });
  }
  if (req.user.pendingEmailCode !== String(code)) {
    return res.status(400).json({ message: "Invalid code" });
  }

  // Re-check uniqueness atomically at confirm time (TOCTOU since /request).
  const existing = await User.findOne({ email: req.user.pendingEmail });
  if (existing) {
    return res.status(409).json({ message: "Email already in use" });
  }

  req.user.email = req.user.pendingEmail;
  req.user.pendingEmail = null;
  req.user.pendingEmailCode = null;
  req.user.pendingEmailCodeExpire = null;
  try {
    await req.user.save();
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email already in use" });
    }
    throw err;
  }

  res.json(publicUser(req.user));
});

// @desc   Change password (requires current password)
// @route  POST /api/user/me/password
exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Current and new password are required" });
  }
  if (newPassword.length < 8) {
    return res
      .status(400)
      .json({ message: "New password must be at least 8 characters" });
  }

  // req.user was loaded without the password hash; reload to verify.
  const user = await User.findById(req.user._id);
  if (!(await user.matchPassword(currentPassword))) {
    // 400 (not 401) so the client doesn't treat it as a session error/logout.
    return res.status(400).json({ message: "Current password is incorrect" });
  }
  if (await user.matchPassword(newPassword)) {
    return res
      .status(400)
      .json({ message: "New password must be different from the current one" });
  }

  user.password = newPassword; // pre-save hook hashes + sets passwordChangedAt
  await user.save();

  // Issue a fresh token so THIS session survives the passwordChangedAt check.
  res.json({ message: "Password updated", token: generateToken(user._id) });
});

// @desc   Delete account (GDPR erasure)
// @route  DELETE /api/user/me
exports.deleteAccount = asyncHandler(async (req, res) => {
  const { password, confirm } = req.body;
  if (confirm !== "DELETE") {
    return res.status(400).json({ message: "Please type DELETE to confirm" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const user = await User.findById(req.user._id);
  if (!(await user.matchPassword(password))) {
    return res.status(400).json({ message: "Password is incorrect" });
  }

  // TODO(paywall): cancel the Stripe subscription first if user.stripeCustomerId.
  // TODO(statistics): cascade-delete ProtocolSession/DiaryEntry/ReflectionEntry.
  await user.deleteOne();

  res.json({ message: "Account deleted" });
});

// @desc   Invite a therapist by email
// @route  POST /api/user/me/invite-therapist
exports.inviteTherapist = asyncHandler(async (req, res) => {
  let { emails } = req.body;
  if (typeof emails === "string") emails = [emails];
  if (!Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({ message: "At least one email is required" });
  }
  if (emails.length > 5) {
    return res
      .status(400)
      .json({ message: "You can invite at most 5 people at a time" });
  }

  const unique = [
    ...new Set(emails.map((e) => String(e).toLowerCase().trim())),
  ];
  for (const e of unique) {
    if (!EMAIL_REGEX.test(e)) {
      return res.status(400).json({ message: `Invalid email: ${e}` });
    }
  }

  const results = await Promise.allSettled(
    unique.map((e) =>
      sendEmail({
        email: e,
        subject: `${req.user.name} invited you to Mindset`,
        message: `${req.user.name} (${req.user.email}) invited you to join them on Mindset as their therapist.`,
      }),
    ),
  );
  const sent = results.filter((r) => r.status === "fulfilled").length;

  res.json({
    message: `Invitation sent to ${sent} of ${unique.length} recipient(s).`,
  });
});
