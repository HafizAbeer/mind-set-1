const mongoose = require("mongoose");

const reflectionEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    emotional: { type: String, required: true },
    rational: { type: String, required: true },
    // Derived label shown in history, e.g. "Angry-work-impatience".
    combination: { type: String, default: "" },
  },
  { timestamps: true },
);

reflectionEntrySchema.index({ user: 1, createdAt: -1 });

module.exports =
  mongoose.models.ReflectionEntry ||
  mongoose.model("ReflectionEntry", reflectionEntrySchema);
