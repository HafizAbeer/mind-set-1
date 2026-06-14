const mongoose = require("mongoose");

// Serverless-safe connection caching.
//
// On Vercel every cold start would otherwise call mongoose.connect() again,
// opening a fresh connection pool per lambda instance and quickly exhausting
// the Atlas connection limit. We cache the connection promise on globalThis so
// warm invocations reuse the existing connection, and we never process.exit in
// serverless (that hard-kills the lambda instead of surfacing a 500).
let cached = globalThis.__mongooseConn;
if (!cached) {
  cached = globalThis.__mongooseConn = { conn: null, promise: null };
}

const connectDB = async () => {
  // Already connected on this warm instance.
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not set");
    }

    cached.promise = mongoose
      .connect(process.env.MONGO_URI, {
        // Keep the pool small: many warm instances * a large pool would blow
        // past shared-tier Atlas connection limits.
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000,
      })
      .then((m) => {
        console.log(`MongoDB Connected: ${m.connection.host}`);
        return m;
      })
      .catch((error) => {
        // Reset so the next request can retry instead of caching a rejection.
        cached.promise = null;
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;
