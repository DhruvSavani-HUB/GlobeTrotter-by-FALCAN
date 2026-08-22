const db = require("../config/db");

// GET ALL ACTIVITIES
const getActivities = (req, res) => {
  const query = `
    SELECT
      activities.id,
      activities.name,
      activities.category,
      activities.cost,
      activities.duration,
      cities.id AS city_id,
      cities.name AS city_name,
      cities.country
    FROM activities
    JOIN cities
      ON activities.city_id = cities.id
    ORDER BY activities.name ASC
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error("GET ACTIVITIES ERROR:", error);

      return res.status(500).json({
        message: "Failed to fetch activities",
        error: error.message,
      });
    }

    return res.status(200).json({
      message: "Activities fetched successfully",
      activities: results,
    });
  });
};


// SEARCH ACTIVITIES
const searchActivities = (req, res) => {
  const { search } = req.query;

  if (!search) {
    return getActivities(req, res);
  }

  const searchValue = `%${search}%`;

  const query = `
    SELECT
      activities.id,
      activities.name,
      activities.category,
      activities.cost,
      activities.duration,
      cities.name AS city_name,
      cities.country
    FROM activities
    JOIN cities
      ON activities.city_id = cities.id
    WHERE activities.name LIKE ?
       OR activities.category LIKE ?
       OR cities.name LIKE ?
    ORDER BY activities.name ASC
  `;

  db.query(
    query,
    [searchValue, searchValue, searchValue],
    (error, results) => {
      if (error) {
        console.error("SEARCH ACTIVITIES ERROR:", error);

        return res.status(500).json({
          message: "Failed to search activities",
          error: error.message,
        });
      }

      return res.status(200).json({
        message: "Activities found successfully",
        activities: results,
      });
    }
  );
};


module.exports = {
  getActivities,
  searchActivities,
};