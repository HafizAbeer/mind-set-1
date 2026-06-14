const { rateLimit, ipKeyGenerator } = require("express-rate-limit");
const MongooseRateLimitStore = require("./rateLimitStore");

// Shared, serverless-safe rate limiting backed by MongoDB (see rateLimitStore).
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

const tooMany = (req, res) =>
  res
    .status(429)
    .json({ message: "Too many requests, please try again later." });

// Key by IP + email (when present in the body) so credential brute-force on a
// single account is throttled without one shared NAT IP locking out everyone.
const ipEmailKey = (req) => {
  const ip = ipKeyGenerator(req.ip || "");
  const email =
    req.body && req.body.email ? String(req.body.email).toLowerCase() : "";
  return email ? `${ip}:${email}` : ip;
};

// For login / register / verify / forgot-password / reset-password.
const authLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: ipEmailKey,
  handler: tooMany,
  store: new MongooseRateLimitStore(),
});

// For credential-mutating / destructive endpoints (password change, email
// change, account delete). Tighter limit; keyed by authenticated user when
// available, else IP.
const sensitiveLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: (req) =>
    req.user ? String(req.user._id) : ipKeyGenerator(req.ip || ""),
  handler: tooMany,
  store: new MongooseRateLimitStore(),
});

module.exports = { authLimiter, sensitiveLimiter };
