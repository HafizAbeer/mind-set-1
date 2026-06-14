const RateLimitHit = require("../models/RateLimitHit");

// express-rate-limit Store backed by the existing mongoose connection.
//
// A SHARED store is mandatory on serverless: the default in-memory store is
// per-lambda and reset on every cold start, so it provides no real protection.
// We reuse the app's mongoose connection (no second DB driver) and do the
// window logic in a single atomic aggregation-pipeline update.
class MongooseRateLimitStore {
  constructor() {
    this.windowMs = 60 * 1000;
  }

  init(options) {
    this.windowMs = options.windowMs;
  }

  async increment(key) {
    const windowMs = this.windowMs;
    const update = [
      {
        $set: {
          count: {
            $cond: [
              { $gt: ["$expiresAt", "$$NOW"] },
              { $add: [{ $ifNull: ["$count", 0] }, 1] },
              1,
            ],
          },
          expiresAt: {
            $cond: [
              { $gt: ["$expiresAt", "$$NOW"] },
              "$expiresAt",
              { $add: ["$$NOW", windowMs] },
            ],
          },
        },
      },
    ];

    let doc;
    try {
      doc = await RateLimitHit.findOneAndUpdate({ key }, update, {
        upsert: true,
        returnDocument: "after",
        updatePipeline: true,
      });
    } catch (err) {
      // Two concurrent first-hits can race the unique upsert; retry once.
      if (err && err.code === 11000) {
        doc = await RateLimitHit.findOneAndUpdate({ key }, update, {
          upsert: true,
          returnDocument: "after",
          updatePipeline: true,
        });
      } else {
        throw err;
      }
    }

    return { totalHits: doc.count, resetTime: doc.expiresAt };
  }

  async decrement(key) {
    await RateLimitHit.updateOne(
      { key, expiresAt: { $gt: new Date() } },
      { $inc: { count: -1 } },
    );
  }

  async resetKey(key) {
    await RateLimitHit.deleteOne({ key });
  }
}

module.exports = MongooseRateLimitStore;
