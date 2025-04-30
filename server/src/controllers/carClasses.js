const { pool } = require("../config/database");

// Create a new car class
exports.createCarClass = async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO car_classes (name, description) VALUES ($1, $2) RETURNING *`,
      [name, description]
    );
    res.status(201).json({ status: "success", data: result.rows[0] });
  } catch (error) {
    console.error("Create car class error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error creating car class" });
  }
};

// List all car classes
exports.listCarClasses = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM car_classes");
    res.json({ status: "success", data: result.rows });
  } catch (error) {
    console.error("List car classes error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error fetching car classes" });
  }
};

// Get car class details
exports.getCarClass = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM car_classes WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Car class not found" });
    }
    res.json({ status: "success", data: result.rows[0] });
  } catch (error) {
    console.error("Get car class error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error fetching car class" });
  }
};

// Update car class
exports.updateCarClass = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      "UPDATE car_classes SET name = $1, description = $2 WHERE id = $3 RETURNING *",
      [name, description, id]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Car class not found" });
    }
    res.json({ status: "success", data: result.rows[0] });
  } catch (error) {
    console.error("Update car class error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error updating car class" });
  }
};

// Delete car class
exports.deleteCarClass = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM car_classes WHERE id = $1", [id]);
    res.json({ status: "success", message: "Car class deleted" });
  } catch (error) {
    console.error("Delete car class error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error deleting car class" });
  }
};
