import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TripCard = ({ trip, onDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${trip.name}"?`,
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/trips/${trip.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete trip');
            }

            alert('Trip deleted successfully!');

            // Tell MyTrips to remove the deleted trip
            if (onDelete) {
                onDelete(trip.id);
            }
        } catch (error) {
            console.error('Delete trip error:', error);

            alert(error.message || 'Unable to delete trip. Please try again.');
        }
    };

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

            <div className="flex flex-wrap gap-3 mt-6">

                <Link
                    to={`/trip/${trip.id}/edit`}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                    Edit
                </Link>

                <button
                    onClick={handleDelete}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TripCard;
