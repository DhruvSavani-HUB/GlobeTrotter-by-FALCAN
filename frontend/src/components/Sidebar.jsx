import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="w-64 min-h-screen bg-gray-900 text-white p-5">

            <div className="flex flex-col gap-3">
                <Link
                    to="/dashboard"
                    className="p-3 rounded-lg hover:bg-gray-700"
                >
                    Dashboard
                </Link>

                <Link
                    to="/create-trip"
                    className="p-3 rounded-lg hover:bg-gray-700"
                >
                    Plan New Trip
                </Link>

                <Link
                    to="/my-trips"
                    className="p-3 rounded-lg hover:bg-gray-700"
                >
                    My Trips
                </Link>

                <Link to="/cities" className="p-3 rounded-lg hover:bg-gray-700">
                    Explore Cities
                </Link>

                <Link
                    to="/activities"
                    className="p-3 rounded-lg hover:bg-gray-700"
                >
                    Activities
                </Link>

                <Link to="/budget" className="p-3 rounded-lg hover:bg-gray-700">
                    Budget
                </Link>

                <Link
                    to="/profile"
                    className="p-3 rounded-lg hover:bg-gray-700"
                >
                    Profile
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
