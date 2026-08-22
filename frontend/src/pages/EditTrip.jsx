import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const EditTrip = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
    });

    const [error, setError] = useState('');

    // useEffect(() => {
    //     const savedTrips = JSON.parse(localStorage.getItem('trips')) || [];

    //     const foundTrip = savedTrips.find(
    //         (trip) => String(trip.id) === String(id),
    //     );

    //     if (!foundTrip) {
    //         navigate('/my-trips');
    //         return;
    //     }

    //     setFormData({
    //         name: foundTrip.name || '',
    //         description: foundTrip.description || '',
    //         start_date: foundTrip.start_date || '',
    //         end_date: foundTrip.end_date || '',
    //     });
    // }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Save changes
    const handleSubmit = (e) => {
        e.preventDefault();

        setError('');

        // Validate dates
        if (formData.end_date < formData.start_date) {
            setError('End date cannot be before start date.');
            return;
        }

        const savedTrips = JSON.parse(localStorage.getItem('trips')) || [];

        const updatedTrips = savedTrips.map((trip) => {
            if (String(trip.id) === String(id)) {
                return {
                    ...trip,
                    name: formData.name,
                    description: formData.description,
                    start_date: formData.start_date,
                    end_date: formData.end_date,
                };
            }

            return trip;
        });

        localStorage.setItem('trips', JSON.stringify(updatedTrips));

        // Go back to trip details
        navigate(`/trip/${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="max-w-3xl mx-auto p-6">
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Edit Trip
                    </h1>

                    <p className="text-gray-500 mt-2 mb-8">
                        Update your trip information.
                    </p>

                    {/* Error */}
                    {error && (
                        <div className="mb-5 bg-red-100 border border-red-200 text-red-600 p-4 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Trip Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Trip Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter trip name"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter trip description"
                                rows="5"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    name="start_date"
                                    value={formData.start_date}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    End Date
                                </label>

                                <input
                                    type="date"
                                    name="end_date"
                                    value={formData.end_date}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-2">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
                            >
                                Save Changes
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate(`/trip/${id}`)}
                                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default EditTrip;
