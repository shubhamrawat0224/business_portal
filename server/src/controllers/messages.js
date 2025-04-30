const { pool } = require("../config/database");

// Send (create) a new message
exports.sendMessage = async (req, res) => {
  const { user_id, content } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO messages (user_id, content) VALUES ($1, $2) RETURNING *`,
      [user_id, content]
    );
    res.status(201).json({ status: "success", data: result.rows[0] });
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ status: "error", message: "Error sending message" });
  }
};

// List messages for a user
exports.listMessages = async (req, res) => {
  const { user_id } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM messages WHERE user_id = $1 ORDER BY created_at DESC`,
      [user_id]
    );
    res.json({ status: "success", data: result.rows });
  } catch (error) {
    console.error("List messages error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error fetching messages" });
  }
};

// Get message details
exports.getMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM messages WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Message not found" });
    }
    res.json({ status: "success", data: result.rows[0] });
  } catch (error) {
    console.error("Get message error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error fetching message" });
  }
};

// Mark message as read
exports.markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "UPDATE messages SET is_read = TRUE WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Message not found" });
    }
    res.json({ status: "success", data: result.rows[0] });
  } catch (error) {
    console.error("Mark as read error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error marking message as read" });
  }
};

// Delete message
exports.deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM messages WHERE id = $1", [id]);
    res.json({ status: "success", message: "Message deleted" });
  } catch (error) {
    console.error("Delete message error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error deleting message" });
  }
};
