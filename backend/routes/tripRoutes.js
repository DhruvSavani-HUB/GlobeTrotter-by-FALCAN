const express = require("express");
const router = express.Router();

const {
  createTrip,
  getMyTrips,
} = require("../controllers/tripController");

router.post("/", createTrip);
router.get("/", getMyTrips);

module.exports = router;