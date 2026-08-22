import React from 'react';
import { Link } from 'react-router-dom';

const TripCard = ({ trip }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-gray-800">{trip.name}</h2>

            <p className="text-gray-500 mt-3">
                {trip.description || 'No description provided.'}
            </p>

            <div className="border-t mt-5 pt-4">
                <p className="text-sm text-gray-600">
                    <span className="font-semibold">Start:</span>{' '}
                    {new Date(trip.start_date).toLocaleDateString()}
                </p>

                <p className="text-sm text-gray-600 mt-2">
                    <span className="font-semibold">End:</span>{' '}
                    {new Date(trip.end_date).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default TripCard;
