// Central error handler. Preserves the app's { message } response convention
// and maps common Mongoose errors to sensible status codes (instead of 500).
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message || "Server error";

  if (err.name === "ValidationError") {
    status = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  } else if (err.code === 11000) {
    status = 409;
    const field = Object.keys(err.keyValue || {})[0];
    message = field ? `${field} already in use` : "Duplicate value";
  } else if (err.name === "CastError") {
    status = 400;
    message = "Invalid identifier";
  }

  // Only log genuine server faults; 4xx are expected client errors.
  if (status >= 500) {
    console.error("Unhandled error:", err);
  }

  res.status(status).json({ message });
};

module.exports = errorHandler;
