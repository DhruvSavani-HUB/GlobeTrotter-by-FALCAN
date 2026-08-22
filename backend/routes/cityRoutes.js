const express = require("express");
const router = express.Router();

const {
  getCities,
  searchCities,
} = require("../controllers/cityController");


// GET ALL CITIES
router.get("/", getCities);


// SEARCH CITIES
router.get("/search", searchCities);


module.exports = router;