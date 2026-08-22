const db = require("../config/db");

// GET EXPENSES BY TRIP
const getExpensesByTrip = (req, res) => {
  const { tripId } = req.params;

  const query = `
    SELECT
      id,
      trip_id,
      category,
      amount
    FROM expenses
    WHERE trip_id = ?
    ORDER BY id DESC
  `;

  db.query(query, [tripId], (error, results) => {
    if (error) {
      console.error("GET EXPENSES ERROR:", error);

      return res.status(500).json({
        message: "Failed to fetch expenses",
        error: error.message,
      });
    }

    return res.status(200).json({
      message: "Expenses fetched successfully",
      expenses: results,
    });
  });
};


// ADD EXPENSE
const createExpense = (req, res) => {
  const {
    trip_id,
    category,
    amount,
  } = req.body;

  if (!trip_id || !category || amount === undefined) {
    return res.status(400).json({
      message: "Trip, category and amount are required",
    });
  }

  if (Number(amount) < 0) {
    return res.status(400).json({
      message: "Amount cannot be negative",
    });
  }

  const query = `
    INSERT INTO expenses
    (trip_id, category, amount)
    VALUES (?, ?, ?)
  `;

  db.query(
    query,
    [trip_id, category, amount],
    (error, result) => {
      if (error) {
        console.error("CREATE EXPENSE ERROR:", error);

        return res.status(500).json({
          message: "Failed to add expense",
          error: error.message,
        });
      }

      return res.status(201).json({
        message: "Expense added successfully",
        expenseId: result.insertId,
      });
    }
  );
};


// DELETE EXPENSE
const deleteExpense = (req, res) => {
  const { id } = req.params;

  const query = `
    DELETE FROM expenses
    WHERE id = ?
  `;

  db.query(query, [id], (error, result) => {
    if (error) {
      console.error("DELETE EXPENSE ERROR:", error);

      return res.status(500).json({
        message: "Failed to delete expense",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    return res.status(200).json({
      message: "Expense deleted successfully",
    });
  });
};


module.exports = {
  getExpensesByTrip,
  createExpense,
  deleteExpense,
};