const express = require("express");
const router = express.Router();

const {
  getActivities,
  searchActivities,
} = require("../controllers/activityController");

// GET ALL ACTIVITIES
router.get("/", getActivities);

// SEARCH ACTIVITIES
router.get("/search", searchActivities);

module.exports = router;