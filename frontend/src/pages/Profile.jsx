import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';

const API_URL = 'http://localhost:5000';

const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch(`${API_URL}/api/auth/profile`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to load profile');
                }

                setUser({
                    name: data.name || '',
                    email: data.email || '',
                });
            } catch (error) {
                console.error('Profile error:', error);
                setError(error.message || 'Unable to load profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!user.name.trim() || !user.email.trim()) {
            setError('Name and email are required.');
            return;
        }

        try {
            setSaving(true);
            setError('');

            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/api/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: user.name.trim(),
                    email: user.email.trim(),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update profile');
            }

            setUser({
                name: data.name || user.name,
                email: data.email || user.email,
            });

            setIsEditing(false);

            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Update profile error:', error);

            setError(error.message || 'Unable to update profile.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-200">
                <Navbar />

                <main className="max-w-4xl mx-auto p-6">
                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <p className="text-gray-600">Loading profile...</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-200">
            <Navbar />

            <main className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="bg-blue-800 p-8 text-center text-white">
                        <div className="w-24 h-24 mx-auto bg-white text-blue-600 rounded-full flex items-center justify-center text-4xl font-bold">
                            {user.name
                                ? user.name.charAt(0).toUpperCase()
                                : 'U'}
                        </div>

                        <h1 className="text-2xl font-bold mt-4">
                            {user.name || 'User'}
                        </h1>

                        <p className="text-blue-100">{user.email}</p>
                    </div>

                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">
                                Personal Information
                            </h2>

                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>

                        {error && (
                            <div className="mb-5 bg-red-100 border border-red-200 text-red-600 p-4 rounded-lg">
                                {error}
                            </div>
                        )}

                        {isEditing ? (
                            <form onSubmit={handleSave} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={user.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                                    >
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        disabled={saving}
                                        className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-5">
                                <div className="border-b pb-4">
                                    <p className="text-sm text-gray-500">
                                        Full Name
                                    </p>

                                    <p className="text-lg font-medium text-gray-800">
                                        {user.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Email Address
                                    </p>

                                    <p className="text-lg font-medium text-gray-800">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
