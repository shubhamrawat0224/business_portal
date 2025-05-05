const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/database");
const axios = require("axios");
const sendMail = require("../config/mailer");
const restrictedCountries = require("../config/restricted-countries");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const getCountryFromIP = async (ip) => {
  try {
    // Check if IP is localhost or private range
    if (
      ip === "::1" ||
      ip === "127.0.0.1" ||
      ip.startsWith("192.168.") ||
      ip.startsWith("10.") ||
      ip.startsWith("172.")
    ) {
      console.log("Local IP detected:", ip);
      return "IN"; // Default to IN for development/testing
    }

    const response = await axios.get(`http://ip-api.com/json/${ip}`, {
      timeout: 5000, // 5 second timeout
    });

    if (response.data.status === "success") {
      return response.data.countryCode;
    }

    console.error("IP API error:", response.data.message);
    return ""; // Return empty string if API fails
  } catch (error) {
    console.error("Error fetching country:", error.message);
    return ""; // Return empty string on error
  }
};

exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  const clientIp = req.ip || req.connection.remoteAddress;

  try {
    // Get user's country
    const countryCode = await getCountryFromIP(clientIp);

    if (!countryCode) {
      return res.status(500).json({
        status: "error",
        message: "Unable to determine your location. Please try again later.",
      });
    }

    if (restrictedCountries.includes(countryCode)) {
      return res.status(403).json({
        status: "error",
        message:
          "Registration is not allowed from your country due to legal restrictions.",
      });
    }

    // Check if user already exists
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    // Create user
    const userInsertQuery =
      "INSERT INTO users (name, email, password, otp, is_verified, country_code) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email";
    const userInsertValues = [
      name,
      email,
      hashedPassword,
      otp,
      false,
      countryCode,
    ];
    const newUser = await pool.query(userInsertQuery, userInsertValues);

    // Send OTP via email
    await sendMail(email, "Your OTP Code", `Your OTP code is: ${otp}`);

    res.status(201).json({
      status: "success",
      message: "User registered successfully. Please verify your email.",
      data: {
        user: newUser.rows[0],
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      status: "error",
      message: "Error during registration",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    if (!user.rows[0].is_verified) {
      return res.status(401).json({
        status: "error",
        message: "Please verify your email first",
      });
    }

    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      status: "success",
      data: {
        token,
        user: {
          id: user.rows[0].id,
          name: user.rows[0].name,
          email: user.rows[0].email,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      status: "error",
      message: "Error during login",
    });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND otp = $2",
      [email, otp]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid OTP",
      });
    }

    await pool.query(
      "UPDATE users SET is_verified = true, otp = NULL WHERE email = $1",
      [email]
    );

    res.json({
      status: "success",
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({
      status: "error",
      message: "Error during OTP verification",
    });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [req.userId]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.json({
      status: "success",
      data: {
        user: user.rows[0],
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({
      status: "error",
      message: "Error fetching user data",
    });
  }
};
