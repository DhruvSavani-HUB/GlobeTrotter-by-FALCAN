import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import api from '../api/api';

const ActivitySearch = () => {
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch activities
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                setLoading(true);
                setError('');

                const response = await api.get('/activities');

                console.log('Activities:', response.data);

                const activityData =
                    response.data.activities || response.data || [];

                setActivities(activityData);
                setFilteredActivities(activityData);
            } catch (err) {
                console.error('Failed to fetch activities:', err);

                setError(
                    err.response?.data?.message ||
                        err.message ||
                        'Failed to load activities',
                );
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    // Search and filter
    useEffect(() => {
        let results = [...activities];

        if (search.trim()) {
            const searchText = search.toLowerCase();

            results = results.filter(
                (activity) =>
                    activity.name?.toLowerCase().includes(searchText) ||
                    activity.city_name?.toLowerCase().includes(searchText) ||
                    activity.category?.toLowerCase().includes(searchText),
            );
        }

        if (category) {
            results = results.filter(
                (activity) => activity.category === category,
            );
        }

        if (city) {
            results = results.filter((activity) => activity.city_name === city);
        }

        setFilteredActivities(results);
    }, [search, category, city, activities]);

    // Unique categories
    const categories = [
        ...new Set(
            activities.map((activity) => activity.category).filter(Boolean),
        ),
    ];

    // Unique cities
    const cities = [
        ...new Set(
            activities.map((activity) => activity.city_name).filter(Boolean),
        ),
    ];

    return (
        <div>
            <Navbar />

            <div className="flex">
                <Sidebar />

                <main className="flex-1 bg-gray-100 min-h-screen p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Explore Activities
                        </h1>

                        <p className="text-gray-600 mt-2">
                            Discover exciting activities for your next trip.
                        </p>
                    </div>

                    {/* Search Filters */}
                    <div className="bg-white rounded-xl shadow p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {/* Search */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Search Activity
                                </label>

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search activities..."
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category
                                </label>

                                <select
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Categories</option>

                                    {categories.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    City
                                </label>

                                <select
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Cities</option>

                                    {cities.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Result Count */}
                    {!loading && !error && (
                        <p className="text-gray-600 mb-5">
                            {filteredActivities.length === 1
                                ? '1 activity found'
                                : `${filteredActivities.length} activities found`}
                        </p>
                    )}

                    {/* Loading */}
                    {loading && (
                        <div className="bg-white rounded-xl shadow p-10 text-center">
                            Loading activities...
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Activities */}
                    {!loading && !error && filteredActivities.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredActivities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
                                >
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">
                                                {activity.name}
                                            </h2>

                                            <p className="text-gray-500 mt-1">
                                                {activity.city_name}
                                            </p>
                                        </div>

                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                                            {activity.category}
                                        </span>
                                    </div>

                                    <div className="border-t mt-5 pt-4 grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Estimated Cost
                                            </p>

                                            <p className="text-lg font-bold text-gray-800 mt-1">
                                                ₹{activity.cost}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Duration
                                            </p>

                                            <p className="text-lg font-bold text-gray-800 mt-1">
                                                {activity.duration} hrs
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* No Results */}
                    {!loading && !error && filteredActivities.length === 0 && (
                        <div className="bg-white rounded-xl shadow p-10 text-center">
                            <h2 className="text-xl font-bold text-gray-800">
                                No activities found
                            </h2>

                            <button
                                onClick={() => {
                                    setSearch('');
                                    setCategory('');
                                    setCity('');
                                }}
                                className="mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ActivitySearch;
