const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const signup = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email and password are required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  const checkUserQuery = `
    SELECT id FROM users WHERE email = ?
  `;

  db.query(checkUserQuery, [email], async (error, results) => {
    if (error) {
      console.error("CHECK USER ERROR:", error);

      return res.status(500).json({
        message: "Database error",
      });
    }

    // User already exists
    if (results.length > 0) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      const insertQuery = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
      `;

      db.query(
        insertQuery,
        [name, email, hashedPassword],
        (insertError, result) => {
          if (insertError) {
            console.error("SIGNUP INSERT ERROR:", insertError);

            return res.status(500).json({
              message: "Failed to create account",
            });
          }

          return res.status(201).json({
            message: "Account created successfully",
            user: {
              id: result.insertId,
              name,
              email,
            },
          });
        }
      );
    } catch (hashError) {
      console.error("PASSWORD HASH ERROR:", hashError);

      return res.status(500).json({
        message: "Failed to process password",
      });
    }
  });
};


// ===============================
// LOGIN
// ===============================
const login = (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const query = `
    SELECT id, name, email, password
    FROM users
    WHERE email = ?
  `;

  db.query(query, [email], async (error, results) => {
    if (error) {
      console.error("LOGIN DATABASE ERROR:", error);

      return res.status(500).json({
        message: "Database error",
      });
    }

    // User not found
    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = results[0];

    try {
      // Compare entered password with hashed password
      const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
      );

      if (!isPasswordCorrect) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      // Create JWT token
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

      return res.status(200).json({
        message: "Login successful",

        token,

        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (compareError) {
      console.error("LOGIN ERROR:", compareError);

      return res.status(500).json({
        message: "Login failed",
      });
    }
  });
};

const getProfile = (req, res) => {
    const userId = req.user.id;

    const query = `
        SELECT id, name, email
        FROM users
        WHERE id = ?
    `;

    db.query(query, [userId], (error, results) => {
        if (error) {
            console.error("GET PROFILE ERROR:", error);

            return res.status(500).json({
                message: "Database error",
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json(results[0]);
    });
};


const updateProfile = (req, res) => {
    const userId = req.user.id;

    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required",
        });
    }

    const query = `
        UPDATE users
        SET name = ?, email = ?
        WHERE id = ?
    `;

    db.query(
        query,
        [name.trim(), email.trim(), userId],
        (error, result) => {
            if (error) {
                console.error("UPDATE PROFILE ERROR:", error);

                if (error.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        message: "Email already registered",
                    });
                }

                return res.status(500).json({
                    message: "Database error",
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            return res.status(200).json({
                message: "Profile updated successfully",
                name: name.trim(),
                email: email.trim(),
            });
        }
    );
};


module.exports = {
  signup,
  login,
  getProfile,
  updateProfile,
};