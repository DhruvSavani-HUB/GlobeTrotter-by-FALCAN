import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function TripDetails() {
    const { id } = useParams();

    const [trip, setTrip] = useState(null);

    useEffect(() => {
        const savedTrips = JSON.parse(localStorage.getItem('trips')) || [];

        const foundTrip = savedTrips.find(
            (item) => String(item.id) === String(id),
        );

        setTrip(foundTrip);
    }, [id]);

    if (!trip) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar />

                <div className="p-10 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Trip Not Found
                    </h1>

                    <Link
                        to="/my-trips"
                        className="inline-block mt-5 text-blue-600 hover:underline"
                    >
                        ← Back to My Trips
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {trip.name}
                    </h1>

                    <p className="text-gray-500 mt-3">
                        {trip.description || 'No description available.'}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                        <div className="bg-gray-50 rounded-lg p-5">
                            <p className="text-sm text-gray-500">Start Date</p>

                            <p className="text-lg font-semibold text-gray-800 mt-1">
                                {trip.start_date}
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-5">
                            <p className="text-sm text-gray-500">End Date</p>

                            <p className="text-lg font-semibold text-gray-800 mt-1">
                                {trip.end_date}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <Link
                            to={`/trip/${trip.id}/edit`}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Edit Trip
                        </Link>

                        <Link
                            to="/my-trips"
                            className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-100"
                        >
                            Back
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default TripDetails;
