const mongoose = require("mongoose");

const diaryEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mood: {
      type: String,
      required: true,
      enum: ["Positive", "Uncertain", "Negative"],
    },
    motivation: { type: String, default: "" },
    text: { type: String, required: true },
  },
  { timestamps: true },
);

diaryEntrySchema.index({ user: 1, createdAt: -1 });

module.exports =
  mongoose.models.DiaryEntry || mongoose.model("DiaryEntry", diaryEntrySchema);
