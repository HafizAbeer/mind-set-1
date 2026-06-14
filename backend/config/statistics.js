// Shared Statistics constants (agreed defaults — see the build plan).

const MINDSET_CATEGORIES = ["Positive", "Unclear", "Negative"];

const SUCCESS_RATINGS = [
  "LittleWorsening",
  "NoChangings",
  "InconstantDevelopment",
  "SlightImprovement",
  "ClearImprovement",
  "MostlyProblemFree",
  "LongTimeProblemFree",
];

// successRating -> stress score on the Graph y-axis (-20..+20; higher = more
// improvement / less stress).
const STRESS_SCORE = {
  LittleWorsening: -10,
  NoChangings: 0,
  InconstantDevelopment: 5,
  SlightImprovement: 8,
  ClearImprovement: 14,
  MostlyProblemFree: 17,
  LongTimeProblemFree: 20,
};

function stressScoreFor(rating) {
  return Object.prototype.hasOwnProperty.call(STRESS_SCORE, rating)
    ? STRESS_SCORE[rating]
    : 0;
}

// Mind-o-Meter: weighted positivity 0..1 (Graph shows 0..1, the tab shows *100).
function mindOMeter({ positive = 0, unclear = 0, negative = 0 }) {
  const total = positive + unclear + negative;
  if (total === 0) return 0;
  return (positive * 1.0 + unclear * 0.5 + negative * 0.0) / total;
}

module.exports = {
  MINDSET_CATEGORIES,
  SUCCESS_RATINGS,
  STRESS_SCORE,
  stressScoreFor,
  mindOMeter,
};
