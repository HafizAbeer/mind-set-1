const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { sensitiveLimiter } = require("../middleware/rateLimit");
const ctrl = require("../controllers/userController");

// All user routes require authentication.
router.use(protect);

router.get("/me", ctrl.getMe);
router.patch("/me/profile", ctrl.updateProfile);
router.patch("/me/preferences", ctrl.updatePreferences);

// Credential-mutating / destructive endpoints are rate-limited (keyed by user).
router.post("/me/email/request", sensitiveLimiter, ctrl.requestEmailChange);
router.post("/me/email/confirm", sensitiveLimiter, ctrl.confirmEmailChange);
router.post("/me/password", sensitiveLimiter, ctrl.changePassword);
router.delete("/me", sensitiveLimiter, ctrl.deleteAccount);
router.post("/me/invite-therapist", sensitiveLimiter, ctrl.inviteTherapist);

module.exports = router;
