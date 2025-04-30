const { pool } = require("../config/database");

// Create a new order
exports.createOrder = async (req, res) => {
  const {
    client_id,
    driver_id,
    car_class_id,
    ordered_time,
    start_location,
    finish_location,
    income,
    status,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO orders (client_id, driver_id, car_class_id, ordered_time, start_location, finish_location, income, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        client_id,
        driver_id,
        car_class_id,
        ordered_time,
        start_location,
        finish_location,
        income,
        status || "pending",
      ]
    );
    res.status(201).json({ status: "success", data: result.rows[0] });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ status: "error", message: "Error creating order" });
  }
};

// List orders (optionally filter by client, driver, status)
exports.listOrders = async (req, res) => {
  const { client_id, driver_id, status } = req.query;
  let query = "SELECT * FROM orders WHERE 1=1";
  const params = [];
  if (client_id) {
    params.push(client_id);
    query += ` AND client_id = $${params.length}`;
  }
  if (driver_id) {
    params.push(driver_id);
    query += ` AND driver_id = $${params.length}`;
  }
  if (status) {
    params.push(status);
    query += ` AND status = $${params.length}`;
  }
  try {
    const result = await pool.query(query, params);
    res.json({ status: "success", data: result.rows });
  } catch (error) {
    console.error("List orders error:", error);
    res.status(500).json({ status: "error", message: "Error fetching orders" });
  }
};

// Get order details
exports.getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Order not found" });
    }
    res.json({ status: "success", data: result.rows[0] });
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({ status: "error", message: "Error fetching order" });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await pool.query(
      "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Order not found" });
    }
    res.json({ status: "success", data: result.rows[0] });
  } catch (error) {
    console.error("Update order status error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error updating order status" });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM orders WHERE id = $1", [id]);
    res.json({ status: "success", message: "Order deleted" });
  } catch (error) {
    console.error("Delete order error:", error);
    res.status(500).json({ status: "error", message: "Error deleting order" });
  }
};
