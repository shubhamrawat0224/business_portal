const express = require("express");
const router = express.Router();
const moderatorsController = require("../controllers/moderators");

// Create moderator
router.post("/", moderatorsController.createModerator);
// List moderators
router.get("/", moderatorsController.listModerators);
// Get moderator details
router.get("/:id", moderatorsController.getModerator);
// Update moderator
router.put("/:id", moderatorsController.updateModerator);
// Delete moderator
router.delete("/:id", moderatorsController.deleteModerator);

module.exports = router;
