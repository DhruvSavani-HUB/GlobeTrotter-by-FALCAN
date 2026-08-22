const db = require("../config/db");

// CREATE TRIP
const createTrip = (req, res) => {
  const userId = 1;

  const {
    name,
    description,
    start_date,
    end_date,
  } = req.body;

  const query = `
    INSERT INTO trips
    (user_id, name, description, start_date, end_date)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      userId,
      name,
      description,
      start_date,
      end_date,
    ],
    (error, result) => {
      if (error) {
        console.error(error);

        return res.status(500).json({
          message: "Failed to create trip",
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
  const userId = 1;

  const query = `
    SELECT *
    FROM trips
    WHERE user_id = ?
    ORDER BY start_date DESC
  `;

  db.query(query, [userId], (error, results) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to fetch trips",
      });
    }

    return res.status(200).json({
      message: "Trips fetched successfully",
      trips: results,
    });
  });
};