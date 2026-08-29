const db = require("../config/db");

const createTrip = (req, res) => {
  const userId = req.user.id;

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


const getMyTrips = (req, res) => {
  const userId = req.user.id;

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


const getTripById = (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT *
        FROM trips
        WHERE id = ?
    `;

    db.query(query, [id], (error, results) => {
        if (error) {
            console.error("GET TRIP ERROR:", error);

            return res.status(500).json({
                message: "Failed to fetch trip",
                error: error.message,
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Trip not found",
            });
        }

        res.status(200).json(results[0]);
    });
};

const updateTrip = (req, res) => {
    const { id } = req.params;

    const {
        name,
        description,
        start_date,
        end_date,
    } = req.body;

    if (!name || !start_date || !end_date) {
        return res.status(400).json({
            message: "Name, start date and end date are required",
        });
    }

    const query = `
        UPDATE trips
        SET
            name = ?,
            description = ?,
            start_date = ?,
            end_date = ?
        WHERE id = ?
    `;

    db.query(
        query,
        [
            name,
            description || null,
            start_date,
            end_date,
            id,
        ],
        (error, result) => {
            if (error) {
                console.error("UPDATE TRIP ERROR:", error);

                return res.status(500).json({
                    message: "Failed to update trip",
                    error: error.message,
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Trip not found",
                });
            }

            res.status(200).json({
                message: "Trip updated successfully",
            });
        }
    );
};

const deleteTrip = (req, res) => {
    const { id } = req.params;

    const query = `
        DELETE FROM trips
        WHERE id = ?
    `;

    db.query(query, [id], (error, result) => {
        if (error) {
            console.error("DELETE TRIP ERROR:", error);

            return res.status(500).json({
                message: "Failed to delete trip",
                error: error.message,
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Trip not found",
            });
        }

        res.status(200).json({
            message: "Trip deleted successfully",
        });
    });
};


module.exports = {
  createTrip,
  getMyTrips,
  getTripById,
  updateTrip,
  deleteTrip,
};