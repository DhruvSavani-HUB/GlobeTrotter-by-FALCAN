import React from 'react';
import { Link } from 'react-router-dom';


const TripCard = ({ trip }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-800">{trip.name}</h3>

            <p className="text-gray-500 mt-2">{trip.description}</p>

            <div className="mt-4 text-sm text-gray-600">
                <p>Start: {trip.start_date}</p>

                <p>End: {trip.end_date}</p>
            </div>

            <div className="flex gap-3 mt-5">
                <Link
                    to={`/trip/${trip.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    View
                </Link>

                <Link
                    to={`/trip/${trip.id}/edit`}
                    className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50"
                >
                    Edit
                </Link>
            </div>
        </div>
    );
};

export default TripCard;
