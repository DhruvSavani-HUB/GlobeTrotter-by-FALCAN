import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import api from '../api/api';

const Budget = () => {
    const [trips, setTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState('');
    const [expenses, setExpenses] = useState([]);

    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');

    const [loading, setLoading] = useState(true);
    const [expenseLoading, setExpenseLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch trips
    useEffect(() => {
        const fetchTrips = async () => {
            try {
                setLoading(true);

                const response = await api.get('/trips');

                const tripData = response.data.trips || [];

                setTrips(tripData);

                // Automatically select first trip
                if (tripData.length > 0) {
                    setSelectedTrip(tripData[0].id);
                }
            } catch (err) {
                console.error('Failed to fetch trips:', err);

                setError(err.response?.data?.message || 'Failed to load trips');
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    // Fetch expenses when trip changes
    useEffect(() => {
        if (!selectedTrip) {
            setExpenses([]);
            return;
        }

        const fetchExpenses = async () => {
            try {
                setExpenseLoading(true);

                const response = await api.get(`/expenses/${selectedTrip}`);

                setExpenses(response.data.expenses || []);
            } catch (err) {
                console.error('Failed to fetch expenses:', err);
            } finally {
                setExpenseLoading(false);
            }
        };

        fetchExpenses();
    }, [selectedTrip]);

    // Add expense
    const handleAddExpense = async (e) => {
        e.preventDefault();

        if (!selectedTrip || !category || !amount) {
            setError('Please select a trip and enter expense details.');
            return;
        }

        try {
            setError('');

            const response = await api.post('/expenses', {
                trip_id: selectedTrip,
                category,
                amount: Number(amount),
            });

            console.log('Expense created:', response.data);

            // Refresh expenses
            const updatedResponse = await api.get(`/expenses/${selectedTrip}`);

            setExpenses(updatedResponse.data.expenses || []);

            setCategory('');
            setAmount('');
        } catch (err) {
            console.error('Failed to add expense:', err);

            setError(err.response?.data?.message || 'Failed to add expense');
        }
    };

    // Calculate total
    const totalExpense = expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0,
    );

    // Calculate category totals
    const categoryTotals = expenses.reduce((accumulator, expense) => {
        const expenseCategory = expense.category;

        accumulator[expenseCategory] =
            (accumulator[expenseCategory] || 0) + Number(expense.amount);

        return accumulator;
    }, {});

    return (
        <div>
            <Navbar />

            <div className="flex">
                <Sidebar />

                <main className="flex-1 bg-gray-100 min-h-screen p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Trip Budget
                        </h1>

                        <p className="text-gray-600 mt-2">
                            Track and manage your travel expenses.
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {/* Trip Selection */}
                    <div className="bg-white rounded-xl shadow p-6 mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Select Trip
                        </label>

                        <select
                            value={selectedTrip}
                            onChange={(e) => setSelectedTrip(e.target.value)}
                            className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a trip</option>

                            {trips.map((trip) => (
                                <option key={trip.id} value={trip.id}>
                                    {trip.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Budget Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow p-6">
                            <p className="text-gray-500">Total Expenses</p>

                            <h2 className="text-3xl font-bold text-blue-600 mt-2">
                                ₹{totalExpense.toFixed(2)}
                            </h2>
                        </div>

                        <div className="bg-white rounded-xl shadow p-6">
                            <p className="text-gray-500">Number of Expenses</p>

                            <h2 className="text-3xl font-bold text-green-600 mt-2">
                                {expenses.length}
                            </h2>
                        </div>

                        <div className="bg-white rounded-xl shadow p-6">
                            <p className="text-gray-500">Selected Trip</p>

                            <h2 className="text-xl font-bold text-purple-600 mt-2">
                                {trips.find(
                                    (trip) =>
                                        String(trip.id) ===
                                        String(selectedTrip),
                                )?.name || 'None'}
                            </h2>
                        </div>
                    </div>

                    {/* Add Expense Form */}
                    <div className="bg-white rounded-xl shadow p-6 mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-5">
                            Add Expense
                        </h2>

                        <form
                            onSubmit={handleAddExpense}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="Category (Hotel, Food...)"
                                className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Amount"
                                className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <button
                                type="submit"
                                className="bg-blue-600 text-white rounded-lg px-5 py-3 font-semibold hover:bg-blue-700"
                            >
                                Add Expense
                            </button>
                        </form>
                    </div>

                    {/* Expense List */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-5">
                            Expense Details
                        </h2>

                        {loading || expenseLoading ? (
                            <p className="text-gray-600">Loading expenses...</p>
                        ) : expenses.length === 0 ? (
                            <p className="text-gray-500">
                                No expenses added for this trip yet.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {expenses.map((expense) => (
                                    <div
                                        key={expense.id}
                                        className="flex justify-between items-center border-b pb-3"
                                    >
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                {expense.category}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Expense ID: {expense.id}
                                            </p>
                                        </div>

                                        <p className="font-bold text-gray-800">
                                            ₹{Number(expense.amount).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Category Summary */}
                    {expenses.length > 0 && (
                        <div className="bg-white rounded-xl shadow p-6 mt-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-5">
                                Expenses by Category
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {Object.entries(categoryTotals).map(
                                    ([categoryName, total]) => (
                                        <div
                                            key={categoryName}
                                            className="border rounded-lg p-4"
                                        >
                                            <p className="text-gray-500">
                                                {categoryName}
                                            </p>

                                            <p className="text-xl font-bold text-gray-800 mt-1">
                                                ₹{total.toFixed(2)}
                                            </p>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Budget;
