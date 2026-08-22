import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import api from '../api/api';

const CitySearch = () => {
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [search, setSearch] = useState('');
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch cities from backend
    useEffect(() => {
        const fetchCities = async () => {
            try {
                setLoading(true);
                setError('');

                const response = await api.get('/cities');

                console.log('Cities:', response.data);

                const cityData = response.data.cities || response.data || [];

                setCities(cityData);
                setFilteredCities(cityData);
            } catch (err) {
                console.error('Failed to fetch cities:', err);

                setError(
                    err.response?.data?.message ||
                        err.message ||
                        'Failed to load cities',
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCities();
    }, []);

    // Search and filter cities
    useEffect(() => {
        let results = [...cities];

        if (search.trim()) {
            const searchText = search.toLowerCase();

            results = results.filter(
                (city) =>
                    city.name?.toLowerCase().includes(searchText) ||
                    city.country?.toLowerCase().includes(searchText),
            );
        }

        if (country) {
            results = results.filter((city) => city.country === country);
        }

        setFilteredCities(results);
    }, [search, country, cities]);

    // Get unique countries
    const countries = [
        ...new Set(cities.map((city) => city.country).filter(Boolean)),
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
                            Explore Cities
                        </h1>

                        <p className="text-gray-600 mt-2">
                            Discover cities and find your next travel
                            destination.
                        </p>
                    </div>

                    {/* Search Section */}
                    <div className="bg-white rounded-xl shadow p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Search Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Search City
                                </label>

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by city or country..."
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Country Filter */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Filter by Country
                                </label>

                                <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    <option value="">All Countries</option>

                                    {countries.map((item) => (
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
                        <div className="mb-5">
                            <p className="text-gray-600">
                                {filteredCities.length === 1
                                    ? '1 city found'
                                    : `${filteredCities.length} cities found`}
                            </p>
                        </div>
                    )}

                    {/* Loading */}
                    {loading && (
                        <div className="bg-white rounded-xl shadow p-10 text-center">
                            <p className="text-gray-600">Loading cities...</p>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Cities Grid */}
                    {!loading && !error && filteredCities.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredCities.map((city) => (
                                <div
                                    key={city.id}
                                    className="bg-white rounded-xl shadow hover:shadow-lg transition p-6"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">
                                                {city.name}
                                            </h2>

                                            <p className="text-gray-500 mt-1">
                                                {city.country}
                                            </p>
                                        </div>

                                        <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                                            City
                                        </div>
                                    </div>

                                    <div className="border-t mt-5 pt-4 grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Cost Index
                                            </p>

                                            <p className="text-lg font-bold text-gray-800 mt-1">
                                                {city.cost_index ?? 'N/A'}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Popularity
                                            </p>

                                            <p className="text-lg font-bold text-gray-800 mt-1">
                                                {city.popularity ?? 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* No Results */}
                    {!loading && !error && filteredCities.length === 0 && (
                        <div className="bg-white rounded-xl shadow p-10 text-center">
                            <h2 className="text-xl font-bold text-gray-800">
                                No cities found
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Try searching for another city or country.
                            </p>

                            <button
                                onClick={() => {
                                    setSearch('');
                                    setCountry('');
                                }}
                                className="mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
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

export default CitySearch;
