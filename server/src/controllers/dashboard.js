const { pool } = require("../config/database");

// Get dashboard statistics
exports.getStatistics = async (req, res) => {
  try {
    // Total orders
    const totalOrdersResult = await pool.query("SELECT COUNT(*) FROM orders");
    const totalOrders = parseInt(totalOrdersResult.rows[0].count);

    // Total earnings (sum of all order incomes)
    const totalEarningsResult = await pool.query(
      "SELECT COALESCE(SUM(income),0) AS total FROM orders"
    );
    const totalEarnings = parseFloat(totalEarningsResult.rows[0].total);

    // Top drivers by income
    const topDriversResult = await pool.query(`
      SELECT d.id, u.name, u.phone, COUNT(o.id) AS orders, COALESCE(SUM(o.income),0) AS income
      FROM drivers d
      JOIN users u ON d.user_id = u.id
      LEFT JOIN orders o ON d.id = o.driver_id
      GROUP BY d.id, u.name, u.phone
      ORDER BY income DESC
      LIMIT 6
    `);
    const topDrivers = topDriversResult.rows;

    // Progress statistics (orders per month for the current year)
    const progressResult = await pool.query(`
      SELECT EXTRACT(MONTH FROM ordered_time) AS month, COUNT(*) AS order_count, COALESCE(SUM(income),0) AS total_income
      FROM orders
      WHERE EXTRACT(YEAR FROM ordered_time) = EXTRACT(YEAR FROM CURRENT_DATE)
      GROUP BY month
      ORDER BY month
    `);
    const progress = progressResult.rows;

    res.json({
      status: "success",
      data: {
        totalOrders,
        totalEarnings,
        topDrivers,
        progress,
      },
    });
  } catch (error) {
    console.error("Dashboard statistics error:", error);
    res.status(500).json({
      status: "error",
      message: "Error fetching dashboard statistics",
    });
  }
};
