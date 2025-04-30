const { pool } = require("../config/database");

// Create a new branch
exports.createBranch = async (req, res) => {
  const { name, address } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO branches (name, address) VALUES ($1, $2) RETURNING *`,
      [name, address]
    );
    res.status(201).json({ status: "success", data: result.rows[0] });
  } catch (error) {
    console.error("Create branch error:", error);
    res.status(500).json({ status: "error", message: "Error creating branch" });
  }
};

// List all branches
exports.listBranches = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM branches");
    res.json({ status: "success", data: result.rows });
  } catch (error) {
    console.error("List branches error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error fetching branches" });
  }
};

// Get branch details
exports.getBranch = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM branches WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Branch not found" });
    }
    res.json({ status: "success", data: result.rows[0] });
  } catch (error) {
    console.error("Get branch error:", error);
    res.status(500).json({ status: "error", message: "Error fetching branch" });
  }
};

// Update branch
exports.updateBranch = async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  try {
    const result = await pool.query(
      "UPDATE branches SET name = $1, address = $2 WHERE id = $3 RETURNING *",
      [name, address, id]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Branch not found" });
    }
    res.json({ status: "success", data: result.rows[0] });
  } catch (error) {
    console.error("Update branch error:", error);
    res.status(500).json({ status: "error", message: "Error updating branch" });
  }
};

// Delete branch
exports.deleteBranch = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM branches WHERE id = $1", [id]);
    res.json({ status: "success", message: "Branch deleted" });
  } catch (error) {
    console.error("Delete branch error:", error);
    res.status(500).json({ status: "error", message: "Error deleting branch" });
  }
};
