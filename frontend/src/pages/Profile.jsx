import React from 'react';
import Navbar from '../components/Navbar.jsx';
import { useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState({
        name: 'Dhruv Savani',
        email: 'dhruv@gmail.com',
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsEditing(false);

        // Later: connect to backend API
        console.log('Updated Profile:', user);
    };

    return (
        <div className="min-h-screen bg-gray-200">
            <Navbar />

            <main className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-xl shadow-md overflow-hidden ">
                    <div className="bg-blue-800 p-8 text-center text-white">
                        <div className="w-24 h-24 mx-auto bg-white text-blue-600 rounded-full flex items-center justify-center text-4xl font-bold">
                            {user.name.charAt(0).toUpperCase()}
                        </div>

                        <h1 className="text-2xl font-bold mt-4">{user.name}</h1>

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
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        Save Changes
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
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
