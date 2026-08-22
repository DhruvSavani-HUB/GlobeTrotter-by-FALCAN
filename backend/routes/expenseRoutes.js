const express = require("express");
const router = express.Router();

const {
  getExpensesByTrip,
  createExpense,
  deleteExpense,
} = require("../controllers/expenseController");

// GET EXPENSES FOR A TRIP
router.get("/:tripId", getExpensesByTrip);

// ADD EXPENSE
router.post("/", createExpense);

// DELETE EXPENSE
router.delete("/:id", deleteExpense);

module.exports = router;