import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        // Later: remove JWT token/localStorage data here
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/dashboard"
                        className="text-2xl font-bold text-blue-600"
                    >
                        Globe<span className="text-gray-800">Trotter</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            to="/dashboard"
                            className="text-gray-600 hover:text-blue-600 font-medium transition"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/create-trip"
                            className="text-gray-600 hover:text-blue-600 font-medium transition"
                        >
                            Plan Trip
                        </Link>

                        <Link
                            to="/my-trips"
                            className="text-gray-600 hover:text-blue-600 font-medium transition"
                        >
                            My Trips
                        </Link>

                        <Link
                            to="/profile"
                            className="text-gray-600 hover:text-blue-600 font-medium transition"
                        >
                            Profile
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
