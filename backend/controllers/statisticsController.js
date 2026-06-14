const ProtocolSession = require("../models/ProtocolSession");
const asyncHandler = require("../middleware/asyncHandler");
const { mindOMeter } = require("../config/statistics");

const DAY = 24 * 60 * 60 * 1000;

function windowDays(period) {
  if (period === "week") return 7;
  if (period === "year") return 365;
  return 30; // month (default)
}

// Rolling windows (UTC). Timezone-aware calendar bucketing is a documented
// refinement; rolling windows are correct and crash-free for the MVP.
function bounds(period) {
  const days = windowDays(period);
  const now = Date.now();
  return {
    now: new Date(now),
    currentStart: new Date(now - days * DAY),
    previousStart: new Date(now - 2 * days * DAY),
  };
}

function trendPct(cur, prev) {
  if (prev === 0) return cur > 0 ? 100 : 0;
  return Math.round(((cur - prev) / prev) * 100);
}

const EMPTY = {
  total: 0,
  positive: 0,
  unclear: 0,
  negative: 0,
  exercises: 0,
  mantras: 0,
  anchors: 0,
  withExercises: 0,
};

async function windowStats(userId, start, end) {
  const match = { user: userId };
  if (start || end) {
    match.createdAt = {};
    if (start) match.createdAt.$gte = start;
    if (end) match.createdAt.$lt = end;
  }
  const [row] = await ProtocolSession.aggregate([
    { $match: match },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        positive: {
          $sum: { $cond: [{ $eq: ["$mindsetCategory", "Positive"] }, 1, 0] },
        },
        unclear: {
          $sum: { $cond: [{ $eq: ["$mindsetCategory", "Unclear"] }, 1, 0] },
        },
        negative: {
          $sum: { $cond: [{ $eq: ["$mindsetCategory", "Negative"] }, 1, 0] },
        },
        exercises: { $sum: { $size: { $ifNull: ["$exercises", []] } } },
        mantras: { $sum: { $size: { $ifNull: ["$mantras", []] } } },
        anchors: { $sum: { $size: { $ifNull: ["$anchors", []] } } },
        withExercises: {
          $sum: {
            $cond: [{ $gt: [{ $size: { $ifNull: ["$exercises", []] } }, 0] }, 1, 0],
          },
        },
      },
    },
  ]);
  return { ...EMPTY, ...(row || {}) };
}

async function topScalar(userId, field, n = 4) {
  const rows = await ProtocolSession.aggregate([
    { $match: { user: userId } },
    { $group: { _id: `$${field}`, count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: n },
  ]);
  return rows.map((r) => r._id).filter(Boolean);
}

async function topArray(userId, field, n = 4) {
  const rows = await ProtocolSession.aggregate([
    { $match: { user: userId } },
    { $unwind: `$${field}` },
    { $group: { _id: `$${field}`, count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: n },
  ]);
  return rows.map((r) => r._id).filter(Boolean);
}

async function topScoredLabel(userId, field, n = 4) {
  const rows = await ProtocolSession.aggregate([
    { $match: { user: userId } },
    { $unwind: `$${field}` },
    { $group: { _id: `$${field}.label`, count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: n },
  ]);
  return rows.map((r) => r._id).filter(Boolean);
}

// @desc   Overview tab: top-N items per category
// @route  GET /api/statistics/overview
exports.overview = asyncHandler(async (req, res) => {
  const uid = req.user._id;
  const [
    topMindsets,
    causes,
    symptoms,
    exercises,
    trigger,
    bodyStructures,
    intention,
    lifeScript,
  ] = await Promise.all([
    topScalar(uid, "mindsetLabel"),
    topArray(uid, "causes"),
    topArray(uid, "symptoms"),
    topScoredLabel(uid, "exercises"),
    topArray(uid, "triggers"),
    topArray(uid, "bodyStructures"),
    topArray(uid, "intentions"),
    topScalar(uid, "lifeScriptLabel"),
  ]);

  res.json({
    topMindsets,
    causes,
    symptoms,
    exercises,
    trigger,
    bodyStructures,
    intention,
    lifeScript,
  });
});

// @desc   Mind-o-Meter tab: current vs previous window metrics + distribution
// @route  GET /api/statistics/mind-o-meter?period=month
exports.mindOMeterStats = asyncHandler(async (req, res) => {
  const period = req.query.period || "month";
  const { now, currentStart, previousStart } = bounds(period);
  const uid = req.user._id;

  const [cur, prev] = await Promise.all([
    windowStats(uid, currentStart, now),
    windowStats(uid, previousStart, currentStart),
  ]);

  const curScore = Math.round(mindOMeter(cur) * 100);
  const prevScore = Math.round(mindOMeter(prev) * 100);

  const metric = (c, p) => ({ value: c, trendPct: trendPct(c, p) });

  const distTotal = cur.positive + cur.unclear + cur.negative;
  const pct = (n) => (distTotal > 0 ? Math.round((n / distTotal) * 100) : 0);

  res.json({
    period,
    positiveMindsets: metric(cur.positive, prev.positive),
    unclearMindsets: metric(cur.unclear, prev.unclear),
    negativeMindsets: metric(cur.negative, prev.negative),
    totalEntries: metric(cur.total, prev.total),
    mindOMeter: { value: curScore, trendPct: trendPct(curScore, prevScore) },
    totalExercises: metric(cur.exercises, prev.exercises),
    totalMantras: metric(cur.mantras, prev.mantras),
    totalAnchors: metric(cur.anchors, prev.anchors),
    distribution: {
      positivePct: pct(cur.positive),
      unclearPct: pct(cur.unclear),
      negativePct: pct(cur.negative),
      exercisesPct: cur.total > 0 ? Math.round((cur.withExercises / cur.total) * 100) : 0,
    },
  });
});

// @desc   Graph tab: stress time-series + score cards + mind-o-meter (0..1)
// @route  GET /api/statistics/graph
exports.graph = asyncHandler(async (req, res) => {
  const uid = req.user._id;
  const sixMonthsAgo = new Date(Date.now() - 182 * DAY);

  const [seriesRows, all] = await Promise.all([
    ProtocolSession.aggregate([
      {
        $match: {
          user: uid,
          successRating: { $ne: null },
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: { $dateTrunc: { date: "$createdAt", unit: "month" } },
          value: { $avg: "$stressScore" },
        },
      },
      { $sort: { _id: 1 } },
    ]),
    windowStats(uid, null, null), // all-time
  ]);

  res.json({
    series: seriesRows.map((r) => ({
      date: r._id,
      value: Math.round(r.value * 10) / 10,
    })),
    yAxisRange: [-20, 20],
    scores: {
      positiveMindsets: all.positive,
      unclearMindsets: all.unclear,
      negativeMindsets: all.negative,
      exercisesScore: all.exercises,
      mantraScore: all.mantras,
      anchorScore: all.anchors,
    },
    mindOMeter: Math.round(mindOMeter(all) * 100) / 100,
  });
});
