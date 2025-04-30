const { pool } = require("../config/database");

// Create a new moderator
exports.createModerator = async (req, res) => {
  const { user_id, branch_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO moderators (user_id, branch_id) VALUES ($1, $2) RETURNING *`,
      [user_id, branch_id]
    );
    res.status(201).json({ status: "success", data: result.rows[0] });
  } catch (error) {
    console.error("Create moderator error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error creating moderator" });
  }
};

// List all moderators
exports.listModerators = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM moderators");
    res.json({ status: "success", data: result.rows });
  } catch (error) {
    console.error("List moderators error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error fetching moderators" });
  }
};

// Get moderator details
exports.getModerator = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM moderators WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Moderator not found" });
    }
    res.json({ status: "success", data: result.rows[0] });
  } catch (error) {
    console.error("Get moderator error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error fetching moderator" });
  }
};

// Update moderator
exports.updateModerator = async (req, res) => {
  const { id } = req.params;
  const { user_id, branch_id } = req.body;
  try {
    const result = await pool.query(
      "UPDATE moderators SET user_id = $1, branch_id = $2 WHERE id = $3 RETURNING *",
      [user_id, branch_id, id]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Moderator not found" });
    }
    res.json({ status: "success", data: result.rows[0] });
  } catch (error) {
    console.error("Update moderator error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error updating moderator" });
  }
};

// Delete moderator
exports.deleteModerator = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM moderators WHERE id = $1", [id]);
    res.json({ status: "success", message: "Moderator deleted" });
  } catch (error) {
    console.error("Delete moderator error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error deleting moderator" });
  }
};
