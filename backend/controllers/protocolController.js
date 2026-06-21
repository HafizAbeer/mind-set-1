const ProtocolSession = require("../models/ProtocolSession");
const asyncHandler = require("../middleware/asyncHandler");
const { stressScoreFor, MINDSET_CATEGORIES } = require("../config/statistics");

const MAX_LIMIT = 50;
const asArray = (v) =>
  Array.isArray(v) ? v.filter((x) => x != null && x !== "") : [];
const scoredArray = (v) =>
  Array.isArray(v)
    ? v
        .filter((x) => x && (x.label || x.label === 0))
        .map((x) => ({ label: String(x.label), score: Number(x.score) || 0 }))
    : [];

// @desc   Finalize a completed protocol run (idempotent on runId)
// @route  POST /api/protocol
exports.createProtocol = asyncHandler(async (req, res) => {
  const b = req.body || {};
  if (!b.mindsetLabel || !String(b.mindsetLabel).trim()) {
    return res.status(400).json({ message: "mindsetLabel is required" });
  }

  const category = MINDSET_CATEGORIES.includes(b.mindsetCategory)
    ? b.mindsetCategory
    : "Unclear";

  // Build the document server-side; never trust client identity/timestamps.
  const doc = {
    user: req.user._id,
    mindsetLabel: String(b.mindsetLabel).trim(),
    mindsetCategory: category,
    mindsetPhrase: b.mindsetPhrase,
    mindsetSentence: b.mindsetSentence,
    triggers: asArray(b.triggers),
    causes: asArray(b.causes),
    bodyStructures: asArray(b.bodyStructures),
    symptoms: asArray(b.symptoms),
    intentions: asArray(b.intentions),
    exercises: scoredArray(b.exercises),
    mantras: scoredArray(b.mantras),
    anchors: scoredArray(b.anchors),
    lifeScriptLabel: b.lifeScriptLabel,
    lifeScriptSentence: b.lifeScriptSentence,
    oldScriptSummary: b.oldScriptSummary,
    oldScriptSentence: b.oldScriptSentence,
    newScriptSummary: b.newScriptSummary,
    newScriptSentence: b.newScriptSentence,
    reflections: Array.isArray(b.reflections) ? b.reflections : [],
    reward: b.reward,
    successRating: b.successRating || null,
    stressScore: stressScoreFor(b.successRating),
    status: "completed",
  };

  const runId =
    typeof b.runId === "string" && b.runId.trim() ? b.runId.trim() : null;

  if (runId) {
    // Upsert so a retried/double-clicked submit returns the same session.
    const session = await ProtocolSession.findOneAndUpdate(
      { user: req.user._id, runId },
      { $setOnInsert: { ...doc, runId } },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
    );
    return res.status(201).json(session);
  }

  const session = await ProtocolSession.create(doc);
  res.status(201).json(session);
});

// @desc   Paginated protocol history
// @route  GET /api/protocol?page=1&limit=10
exports.listProtocol = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(req.query.limit, 10) || 10));
  const filter = { user: req.user._id, status: "completed" };

  const [items, total] = await Promise.all([
    ProtocolSession.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    ProtocolSession.countDocuments(filter),
  ]);

  res.json({ items, page, limit, total });
});
