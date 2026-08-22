const db = require("../config/db");

// CREATE TRIP
const createTrip = (req, res) => {
  const {
    name,
    description,
    start_date,
    end_date,
  } = req.body;

  // Temporary test user
  const user_id = 1;

  if (!name || !start_date || !end_date) {
    return res.status(400).json({
      message: "Trip name, start date and end date are required",
    });
  }

  const query = `
    INSERT INTO trips
    (user_id, name, description, start_date, end_date)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      user_id,
      name,
      description || null,
      start_date,
      end_date,
    ],
    (error, result) => {
      if (error) {
        console.error("DATABASE ERROR:", error);

        return res.status(500).json({
          message: "Failed to create trip",
          error: error.message,
        });
      }

      return res.status(201).json({
        message: "Trip created successfully",
        tripId: result.insertId,
      });
    }
  );
};


// GET MY TRIPS
const getMyTrips = (req, res) => {
  // Temporary test user
  const user_id = 1;

  const query = `
    SELECT *
    FROM trips
    WHERE user_id = ?
    ORDER BY start_date ASC
  `;

  db.query(query, [user_id], (error, results) => {
    if (error) {
      console.error("GET TRIPS DATABASE ERROR:", error);

      return res.status(500).json({
        message: "Failed to fetch trips",
        error: error.message,
      });
    }

    return res.status(200).json({
      message: "Trips fetched successfully",
      trips: results,
    });
  });
};


module.exports = {
  createTrip,
  getMyTrips,
};