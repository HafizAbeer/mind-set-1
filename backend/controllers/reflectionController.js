const ReflectionEntry = require("../models/ReflectionEntry");
const ProtocolSession = require("../models/ProtocolSession");
const asyncHandler = require("../middleware/asyncHandler");

const MAX_LIMIT = 50;

// Derive the "combination" label from the user's most recent protocol run,
// e.g. "Joy-work-impatience". Falls back to "" when there's no session yet.
async function deriveCombination(userId) {
  const latest = await ProtocolSession.findOne({ user: userId })
    .sort({ createdAt: -1 })
    .select("mindsetLabel triggers causes");
  if (!latest) return "";
  return [latest.mindsetLabel, latest.triggers?.[0], latest.causes?.[0]]
    .filter(Boolean)
    .join("-");
}

// @desc   Create a reflection entry
// @route  POST /api/reflection
exports.createReflection = asyncHandler(async (req, res) => {
  const { emotional, rational } = req.body || {};
  if (!emotional || !String(emotional).trim()) {
    return res.status(400).json({ message: "Emotional aspects are required" });
  }
  if (!rational || !String(rational).trim()) {
    return res.status(400).json({ message: "Rational aspects are required" });
  }

  const combination = await deriveCombination(req.user._id);
  const entry = await ReflectionEntry.create({
    user: req.user._id,
    emotional: String(emotional).trim().slice(0, 5000),
    rational: String(rational).trim().slice(0, 5000),
    combination,
  });
  res.status(201).json(entry);
});

// @desc   Paginated reflection history
// @route  GET /api/reflection?page=1&limit=10
exports.listReflection = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(req.query.limit, 10) || 10));
  const filter = { user: req.user._id };

  const [rows, total] = await Promise.all([
    ReflectionEntry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    ReflectionEntry.countDocuments(filter),
  ]);

  const items = rows.map((r) => ({
    _id: r._id,
    timestamp: r.createdAt,
    combination: r.combination,
    text: r.emotional,
    emotional: r.emotional,
    rational: r.rational,
  }));

  res.json({ items, page, limit, total });
});
