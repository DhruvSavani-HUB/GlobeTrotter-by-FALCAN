import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TripCard from '../components/TripCard';
import api from '../api/api';

function MyTrips() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                setLoading(true);
                setError('');

                const response = await api.get('/trips');

                console.log('Trips response:', response.data);

                setTrips(response.data.trips || []);
            } catch (error) {
                console.error('Failed to fetch trips:', error);

                setError(
                    error.response?.data?.message ||
                        error.message ||
                        'Failed to load trips',
                );
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            My Trips
                        </h1>

                        <p className="text-gray-500 mt-2">
                            View and manage your planned adventures.
                        </p>
                    </div>

                    <Link
                        to="/create-trip"
                        className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        + Create New Trip
                    </Link>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="bg-white rounded-xl shadow-sm p-10 text-center">
                        <p className="text-gray-600">Loading your trips...</p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Trips */}
                {!loading && !error && trips.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trips.map((trip) => (
                            <TripCard key={trip.id} trip={trip} />
                        ))}
                    </div>
                )}

                {/* No Trips */}
                {!loading && !error && trips.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-10 text-center">
                        <h2 className="text-xl font-bold text-gray-800">
                            No trips yet
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Start planning your next adventure.
                        </p>

                        <Link
                            to="/create-trip"
                            className="inline-block mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Create Your First Trip
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}

export default MyTrips;
