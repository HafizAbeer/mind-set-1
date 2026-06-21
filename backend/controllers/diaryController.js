const DiaryEntry = require("../models/DiaryEntry");
const asyncHandler = require("../middleware/asyncHandler");

const MAX_LIMIT = 50;
const MOODS = ["Positive", "Uncertain", "Negative"];

// @desc   Create a diary entry
// @route  POST /api/diary
exports.createDiary = asyncHandler(async (req, res) => {
  const { mood, motivation = "", text } = req.body || {};
  if (!MOODS.includes(mood)) {
    return res.status(400).json({ message: "A valid mood is required" });
  }
  if (!text || !String(text).trim()) {
    return res.status(400).json({ message: "Text is required" });
  }
  if (String(text).length > 5000) {
    return res.status(400).json({ message: "Text is too long" });
  }

  const entry = await DiaryEntry.create({
    user: req.user._id,
    mood,
    motivation: String(motivation).slice(0, 200),
    text: String(text).trim(),
  });
  res.status(201).json(entry);
});

// @desc   Paginated diary history (maps mood -> sentiment for the UI)
// @route  GET /api/diary?page=1&limit=10
exports.listDiary = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(req.query.limit, 10) || 10));
  const filter = { user: req.user._id };

  const [rows, total] = await Promise.all([
    DiaryEntry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    DiaryEntry.countDocuments(filter),
  ]);

  const items = rows.map((d) => ({
    _id: d._id,
    timestamp: d.createdAt,
    sentiment: d.mood,
    motivation: d.motivation,
    text: d.text,
  }));

  res.json({ items, page, limit, total });
});
