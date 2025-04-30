const { pool } = require("../config/database");

// Start a new shift for a driver
exports.startShift = async (req, res) => {
  const { driver_id, start_time } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO shifts (driver_id, start_time) VALUES ($1, $2) RETURNING *`,
      [driver_id, start_time || new Date()]
    );
    res.status(201).json({ status: "success", data: result.rows[0] });
  } catch (error) {
    console.error("Start shift error:", error);
    res.status(500).json({ status: "error", message: "Error starting shift" });
  }
};

// End a shift for a driver
exports.endShift = async (req, res) => {
  const { id } = req.params;
  const { end_time } = req.body;
  try {
    const result = await pool.query(
      `UPDATE shifts SET end_time = $1 WHERE id = $2 RETURNING *`,
      [end_time || new Date(), id]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Shift not found" });
    }
    res.json({ status: "success", data: result.rows[0] });
  } catch (error) {
    console.error("End shift error:", error);
    res.status(500).json({ status: "error", message: "Error ending shift" });
  }
};

// List all shifts (optionally filter by driver)
exports.listShifts = async (req, res) => {
  const { driver_id } = req.query;
  let query = "SELECT * FROM shifts WHERE 1=1";
  const params = [];
  if (driver_id) {
    params.push(driver_id);
    query += ` AND driver_id = $${params.length}`;
  }
  try {
    const result = await pool.query(query, params);
    res.json({ status: "success", data: result.rows });
  } catch (error) {
    console.error("List shifts error:", error);
    res.status(500).json({ status: "error", message: "Error fetching shifts" });
  }
};

// Get shift details
exports.getShift = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM shifts WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Shift not found" });
    }
    res.json({ status: "success", data: result.rows[0] });
  } catch (error) {
    console.error("Get shift error:", error);
    res.status(500).json({ status: "error", message: "Error fetching shift" });
  }
};

// Delete shift
exports.deleteShift = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM shifts WHERE id = $1", [id]);
    res.json({ status: "success", message: "Shift deleted" });
  } catch (error) {
    console.error("Delete shift error:", error);
    res.status(500).json({ status: "error", message: "Error deleting shift" });
  }
};
