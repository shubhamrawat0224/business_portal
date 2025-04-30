const jwt = require("jsonwebtoken");
const { pool } = require("../config/database");

module.exports = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    // Check if user still exists
    const user = await pool.query("SELECT id FROM users WHERE id = $1", [
      decoded.userId,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({
        status: "error",
        message: "User no longer exists",
      });
    }

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: "error",
        message: "Invalid token",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "error",
        message: "Token expired",
      });
    }
    res.status(500).json({
      status: "error",
      message: "Error authenticating user",
    });
  }
};
