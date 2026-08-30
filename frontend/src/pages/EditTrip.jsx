import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const API_URL = 'http://localhost:5000';

const EditTrip = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                setLoading(true);
                setError('');

                const token = localStorage.getItem('token');

                const response = await fetch(`${API_URL}/api/trips/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch trip');
                }

                setFormData({
                    name: data.name || '',
                    description: data.description || '',
                    start_date: data.start_date
                        ? data.start_date.substring(0, 10)
                        : '',
                    end_date: data.end_date
                        ? data.end_date.substring(0, 10)
                        : '',
                });
            } catch (error) {
                console.error('Fetch trip error:', error);
                setError(error.message || 'Unable to load trip.');
            } finally {
                setLoading(false);
            }
        };

        fetchTrip();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        if (!formData.name.trim()) {
            setError('Please enter a trip name.');
            return;
        }

        if (!formData.start_date || !formData.end_date) {
            setError('Please select both dates.');
            return;
        }

        if (formData.end_date < formData.start_date) {
            setError('End date cannot be before start date.');
            return;
        }

        try {
            setSaving(true);

            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/api/trips/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    description: formData.description.trim(),
                    start_date: formData.start_date,
                    end_date: formData.end_date,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update trip');
            }

            alert('Trip updated successfully!');

            navigate(`/my-trips`);
        } catch (error) {
            console.error('Update trip error:', error);

            setError(
                error.message || 'Unable to update trip. Please try again.',
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar />

                <main className="max-w-3xl mx-auto p-6">
                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <p className="text-gray-600">Loading trip...</p>
                    </div>
                </main>
            </div>
        );
    }

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

                    {error && (
                        <div className="mb-6 bg-red-100 border border-red-200 text-red-700 p-4 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
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

                        <div className="flex gap-4 pt-2">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-300 transition"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate(`/trip/${id}`)}
                                disabled={saving}
                                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
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
