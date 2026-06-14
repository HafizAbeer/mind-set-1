const mongoose = require("mongoose");
const { MINDSET_CATEGORIES, SUCCESS_RATINGS } = require("../config/statistics");

const scoredItemSchema = new mongoose.Schema(
  { label: String, score: { type: Number, default: 0 } },
  { _id: false },
);

const reflectionPairSchema = new mongoose.Schema(
  { aTitle: String, aValue: String, bTitle: String, bValue: String },
  { _id: false },
);

// One document per COMPLETED protocol run (append model, never overwrite).
const protocolSessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mindsetLabel: String,
    mindsetCategory: {
      type: String,
      enum: MINDSET_CATEGORIES,
      default: "Unclear",
    },
    mindsetPhrase: String,
    mindsetSentence: String,
    // Per-category arrays so aggregation can $unwind/$sortByCount for top-N.
    triggers: [String],
    causes: [String],
    bodyStructures: [String],
    symptoms: [String],
    intentions: [String],
    exercises: [scoredItemSchema],
    mantras: [scoredItemSchema],
    anchors: [scoredItemSchema],
    lifeScriptLabel: String,
    lifeScriptSentence: String,
    oldScriptSummary: String,
    oldScriptSentence: String,
    newScriptSummary: String,
    newScriptSentence: String,
    reflections: [reflectionPairSchema],
    reward: String,
    successRating: { type: String, enum: [...SUCCESS_RATINGS, null], default: null },
    stressScore: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "completed"], default: "completed" },
    // Client-generated idempotency key: a double-submitted "Continue" upserts
    // the same document instead of creating duplicates that poison aggregates.
    runId: { type: String, default: null },
  },
  { timestamps: true },
);

protocolSessionSchema.index({ user: 1, createdAt: -1 });
protocolSessionSchema.index(
  { user: 1, runId: 1 },
  { unique: true, partialFilterExpression: { runId: { $type: "string" } } },
);

module.exports =
  mongoose.models.ProtocolSession ||
  mongoose.model("ProtocolSession", protocolSessionSchema);
