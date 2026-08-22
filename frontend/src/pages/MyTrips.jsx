import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TripCard from '../components/TripCard';

function MyTrips() {
    const [trips, setTrips] = useState([]);

    // Get trips from localStorage
    useEffect(() => {
        const savedTrips = JSON.parse(localStorage.getItem('trips')) || [];

        setTrips(savedTrips);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="max-w-7xl mx-auto p-6">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            My Trips
                        </h1>

                        <p className="text-gray-500 mt-2">
                            View and manage your trips.
                        </p>
                    </div>

                    <Link
                        to="/create-trip"
                        className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
                    >
                        + Create New Trip
                    </Link>
                </div>

                {/* Display Trips */}
                {trips.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-10 text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            No Trips Yet
                        </h2>

                        <p className="text-gray-500 mt-2">
                            You haven't created any trips yet.
                        </p>

                        <Link
                            to="/create-trip"
                            className="inline-block mt-6 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
                        >
                            Create Your First Trip
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trips.map((trip) => (
                            <TripCard key={trip.id} trip={trip} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default MyTrips;

// import React from 'react';
// import Navbar from '../components/Navbar.jsx';
// import TripCard from '../components/TripCard.jsx';
// import { Link } from 'react-router-dom';

// const MyTrips = () => {
//     const trips = [
//         {
//             id: 1,
//             name: 'Gujarat Trip',
//             description: 'Explore Ahmedabad, Dwarka and Somnath.',
//             start_date: '2026-09-10',
//             end_date: '2026-09-15',
//         },
//         {
//             id: 2,
//             name: 'Rajasthan Adventure',
//             description: 'Visit Jaipur, Udaipur and Jaisalmer.',
//             start_date: '2026-10-01',
//             end_date: '2026-10-07',
//         },
//         {
//             id: 3,
//             name: 'Goa Vacation',
//             description: 'Relax at beaches and explore local attractions.',
//             start_date: '2026-11-05',
//             end_date: '2026-11-10',
//         },
//     ];

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <Navbar />

//             <main className="max-w-7xl mx-auto p-6">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
//                     <div>
//                         <h1 className="text-3xl font-bold text-gray-800">
//                             My Trips
//                         </h1>

//                         <p className="text-gray-500 mt-2">
//                             View and manage all your planned trips.
//                         </p>
//                     </div>

//                     <Link
//                         to="/create-trip"
//                         className="bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700"
//                     >
//                         + Create New Trip
//                     </Link>
//                 </div>

//                 {trips.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {trips.map((trip) => (
//                             <TripCard key={trip.id} trip={trip} />
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="bg-white rounded-xl shadow-sm p-10 text-center">
//                         <h2 className="text-xl font-semibold text-gray-800">
//                             No trips yet
//                         </h2>

//                         <p className="text-gray-500 mt-2">
//                             Start planning your next adventure.
//                         </p>

//                         <Link
//                             to="/create-trip"
//                             className="inline-block mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
//                         >
//                             Create Your First Trip
//                         </Link>
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default MyTrips;
