const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messages");

// Send message
router.post("/", messagesController.sendMessage);
// List messages for a user
router.get("/", messagesController.listMessages);
// Get message details
router.get("/:id", messagesController.getMessage);
// Mark message as read
router.patch("/:id/read", messagesController.markAsRead);
// Delete message
router.delete("/:id", messagesController.deleteMessage);

module.exports = router;
