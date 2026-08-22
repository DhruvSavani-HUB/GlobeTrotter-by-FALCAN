import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TripCard from '../components/TripCard';

const Dashboard = () => {
    const trips = [
        {
            id: 1,
            name: 'Gujarat Trip',
            description: 'Ahmedabad and Dwarka journey',
            start_date: '2026-09-10',
            end_date: '2026-09-15',
        },
        {
            id: 2,
            name: 'Rajasthan Trip',
            description: 'Udaipur and Jaipur adventure',
            start_date: '2026-10-01',
            end_date: '2026-10-07',
        },
    ];

    return (
        <div>
            <Navbar />

            <div className="flex">
                <Sidebar />

                <main className="flex-1 bg-gray-100 min-h-screen p-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome to GlobeTrotter
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Plan and manage your upcoming trips.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-5">My Trips</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trips.map((trip) => (
                            <TripCard key={trip.id} trip={trip} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
