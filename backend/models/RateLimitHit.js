const mongoose = require("mongoose");

// Backs the shared rate-limit store. One document per limiter key; Mongo TTL
// auto-purges expired windows (the limiter also checks expiresAt directly, so
// correctness doesn't depend on TTL timing).
const rateLimitHitSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true },
});

rateLimitHitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports =
  mongoose.models.RateLimitHit ||
  mongoose.model("RateLimitHit", rateLimitHitSchema);
