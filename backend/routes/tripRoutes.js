const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const {
  createTrip,
  getMyTrips,
} = require("../controllers/tripController");

// All trip routes require login
router.post("/", authenticateToken, createTrip);

router.get("/", authenticateToken, getMyTrips);

module.exports = router;