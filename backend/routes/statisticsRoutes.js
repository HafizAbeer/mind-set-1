const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const protocol = require("../controllers/protocolController");
const diary = require("../controllers/diaryController");
const reflection = require("../controllers/reflectionController");
const stats = require("../controllers/statisticsController");

// Mounted at /api. protect is applied per-route (not router.use) so this router
// never intercepts sibling /api/auth or /api/user requests that fall through it.

// Data capture
router.post("/protocol", protect, protocol.createProtocol);
router.get("/protocol", protect, protocol.listProtocol);
router.post("/diary", protect, diary.createDiary);
router.get("/diary", protect, diary.listDiary);
router.post("/reflection", protect, reflection.createReflection);
router.get("/reflection", protect, reflection.listReflection);

// Aggregations
router.get("/statistics/overview", protect, stats.overview);
router.get("/statistics/mind-o-meter", protect, stats.mindOMeterStats);
router.get("/statistics/graph", protect, stats.graph);

module.exports = router;
