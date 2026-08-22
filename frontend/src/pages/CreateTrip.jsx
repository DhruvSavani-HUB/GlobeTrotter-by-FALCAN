import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api/api';

function CreateTrip() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');

        // Validate dates
        if (formData.end_date < formData.start_date) {
            setError('End date cannot be before the start date.');
            return;
        }

        setLoading(true);

        try {
            // Send trip data to backend
            const response = await api.post('/trips', formData);

            console.log('Trip created:', response.data);

            setSuccess('Trip created successfully!');

            // Redirect after successful creation
            setTimeout(() => {
                navigate('/my-trips');
            }, 1000);
        } catch (error) {
            console.error('FULL ERROR:', error);
            console.error('RESPONSE:', error.response);
            console.error('DATA:', error.response?.data);

            setError(
                error.response?.data?.message ||
                    error.message ||
                    'Failed to create trip',
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-blue-600 px-6 py-8 text-white">
                        <h1 className="text-3xl font-bold">Plan a New Trip</h1>

                        <p className="text-blue-100 mt-2">
                            Start planning your next adventure.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="p-6 md:p-8">
                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 border border-red-200 bg-red-50 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        {/* Success Message */}
                        {success && (
                            <div className="mb-6 border border-green-200 bg-green-50 text-green-700 px-4 py-3 rounded-lg">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Trip Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Trip Name *
                                </label>

                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Example: Goa Summer Vacation"
                                    required
                                    disabled={loading}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Description
                                </label>

                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe your trip..."
                                    rows="5"
                                    disabled={loading}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none disabled:bg-gray-100"
                                />
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Start Date */}
                                <div>
                                    <label
                                        htmlFor="start_date"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Start Date *
                                    </label>

                                    <input
                                        type="date"
                                        id="start_date"
                                        name="start_date"
                                        value={formData.start_date}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                    />
                                </div>

                                {/* End Date */}
                                <div>
                                    <label
                                        htmlFor="end_date"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        End Date *
                                    </label>

                                    <input
                                        type="date"
                                        id="end_date"
                                        name="end_date"
                                        value={formData.end_date}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        min={formData.start_date || undefined}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
                                >
                                    {loading
                                        ? 'Creating Trip...'
                                        : 'Create Trip'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate('/my-trips')}
                                    disabled={loading}
                                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default CreateTrip;
