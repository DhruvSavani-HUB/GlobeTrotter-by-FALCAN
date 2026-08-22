import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TripCard from '../components/TripCard';
import api from '../api/api';

const Dashboard = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                setLoading(true);
                setError('');

                const response = await api.get('/trips');

                console.log('Dashboard API response:', response.data);

                // Your backend returns:
                // { message: "...", trips: [...] }
                setTrips(response.data.trips || []);
            } catch (err) {
                console.error('Failed to fetch trips:', err);

                setError(
                    err.response?.data?.message ||
                        err.message ||
                        'Failed to load trips',
                );
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    // Display latest 3 trips on Dashboard
    const recentTrips = trips.slice(0, 3);

    return (
        <div>
            <Navbar />

            <div className="flex">
                <Sidebar />

                <main className="flex-1 bg-gray-100 min-h-screen p-8">
                    {/* Welcome Section */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                Welcome to GlobeTrotter
                            </h1>

                            <p className="text-gray-600 mt-2">
                                Plan and manage your upcoming trips.
                            </p>
                        </div>

                        <Link
                            to="/create-trip"
                            className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            + Create New Trip
                        </Link>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {/* Total Trips */}
                        <div className="bg-white rounded-xl shadow p-6">
                            <p className="text-gray-500">Total Trips</p>

                            <h2 className="text-3xl font-bold text-blue-600 mt-2">
                                {loading ? '...' : trips.length}
                            </h2>
                        </div>

                        {/* Upcoming Trips */}
                        <div className="bg-white rounded-xl shadow p-6">
                            <p className="text-gray-500">Upcoming Trips</p>

                            <h2 className="text-3xl font-bold text-green-600 mt-2">
                                {loading
                                    ? '...'
                                    : trips.filter(
                                          (trip) =>
                                              new Date(trip.start_date) >=
                                              new Date(),
                                      ).length}
                            </h2>
                        </div>

                        {/* Completed Trips */}
                        <div className="bg-white rounded-xl shadow p-6">
                            <p className="text-gray-500">Completed Trips</p>

                            <h2 className="text-3xl font-bold text-purple-600 mt-2">
                                {loading
                                    ? '...'
                                    : trips.filter(
                                          (trip) =>
                                              new Date(trip.end_date) <
                                              new Date(),
                                      ).length}
                            </h2>
                        </div>
                    </div>

                    {/* Trips Section */}
                    <div className="flex justify-between items-center mt-8 mb-5">
                        <h2 className="text-2xl font-bold">My Recent Trips</h2>

                        {trips.length > 0 && (
                            <Link
                                to="/my-trips"
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                View All →
                            </Link>
                        )}
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="bg-white rounded-xl shadow p-8 text-center">
                            <p className="text-gray-600">Loading trips...</p>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Trips */}
                    {!loading && !error && recentTrips.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recentTrips.map((trip) => (
                                <TripCard key={trip.id} trip={trip} />
                            ))}
                        </div>
                    )}

                    {/* No Trips */}
                    {!loading && !error && trips.length === 0 && (
                        <div className="bg-white rounded-xl shadow p-10 text-center">
                            <h3 className="text-xl font-bold text-gray-800">
                                No trips created yet
                            </h3>

                            <p className="text-gray-500 mt-2">
                                Create your first adventure to get started.
                            </p>

                            <Link
                                to="/create-trip"
                                className="inline-block mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700"
                            >
                                Create Trip
                            </Link>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
