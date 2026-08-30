const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const {
  createTrip,
  getMyTrips,
  getTripById,
  updateTrip,
  deleteTrip,
} = require("../controllers/tripController");

router.post("/", authenticateToken, createTrip);

router.get("/", authenticateToken, getMyTrips);

router.get("/:id", authenticateToken, getTripById);

router.put("/:id", authenticateToken, updateTrip);

router.delete("/:id", authenticateToken, deleteTrip);

module.exports = router;