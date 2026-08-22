const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const checkEmailQuery =
    "SELECT id FROM users WHERE email = ?";

  db.query(checkEmailQuery, [email], async (error, results) => {
    if (error) {
      return res.status(500).json({
        message: "Database error",
        error: error.message,
      });
    }

    if (results.length > 0) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertQuery =
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

      db.query(
        insertQuery,
        [name, email, hashedPassword],
        (error, result) => {
          if (error) {
            return res.status(500).json({
              message: "Failed to create user",
              error: error.message,
            });
          }

          res.status(201).json({
            message: "User registered successfully",
            userId: result.insertId,
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        message: "Server error",
      });
    }
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const query =
    "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], async (error, results) => {
    if (error) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = results[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
};

module.exports = {
  signup,
  login,
};