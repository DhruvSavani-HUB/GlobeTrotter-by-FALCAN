const db = require("../config/db");

// GET ALL CITIES
const getCities = (req, res) => {
  const query = `
    SELECT 
      id,
      name,
      country,
      cost_index,
      popularity
    FROM cities
    ORDER BY popularity DESC
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error("GET CITIES DATABASE ERROR:", error);

      return res.status(500).json({
        message: "Failed to fetch cities",
        error: error.message,
      });
    }

    return res.status(200).json({
      message: "Cities fetched successfully",
      cities: results,
    });
  });
};


// SEARCH CITIES
const searchCities = (req, res) => {
  const { search } = req.query;

  if (!search) {
    return getCities(req, res);
  }

  const query = `
    SELECT 
      id,
      name,
      country,
      cost_index,
      popularity
    FROM cities
    WHERE name LIKE ?
       OR country LIKE ?
    ORDER BY popularity DESC
  `;

  const searchValue = `%${search}%`;

  db.query(
    query,
    [searchValue, searchValue],
    (error, results) => {
      if (error) {
        console.error("SEARCH CITIES ERROR:", error);

        return res.status(500).json({
          message: "Failed to search cities",
          error: error.message,
        });
      }

      return res.status(200).json({
        message: "Cities found successfully",
        cities: results,
      });
    }
  );
};


module.exports = {
  getCities,
  searchCities,
};