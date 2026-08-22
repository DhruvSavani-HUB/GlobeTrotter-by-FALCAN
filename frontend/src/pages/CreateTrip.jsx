import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function CreateTrip() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setError('');

        // Validate dates
        if (formData.end_date < formData.start_date) {
            setError('End date cannot be before start date.');
            return;
        }

        // Get existing trips
        const existingTrips = JSON.parse(localStorage.getItem('trips')) || [];

        // Create new trip
        const newTrip = {
            id: Date.now(),
            name: formData.name.trim(),
            description: formData.description.trim(),
            start_date: formData.start_date,
            end_date: formData.end_date,
        };

        // Save updated trips
        const updatedTrips = [...existingTrips, newTrip];

        localStorage.setItem('trips', JSON.stringify(updatedTrips));

        // Go to My Trips
        navigate('/my-trips');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="max-w-3xl mx-auto p-6">
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Create New Trip
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Plan your next adventure by adding your trip
                            details.
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-100 border border-red-200 text-red-700">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Trip Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Trip Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Goa Vacation"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-2"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Start Date */}
                            <div>
                                <label
                                    htmlFor="start_date"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Start Date
                                </label>

                                <input
                                    id="start_date"
                                    type="date"
                                    name="start_date"
                                    value={formData.start_date}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* End Date */}
                            <div>
                                <label
                                    htmlFor="end_date"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    End Date
                                </label>

                                <input
                                    id="end_date"
                                    type="date"
                                    name="end_date"
                                    value={formData.end_date}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-3">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                            >
                                Create Trip
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate('/my-trips')}
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
}

export default CreateTrip;

// import React from 'react';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';

// const CreateTrip = () => {
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//         start_date: '',
//         end_date: '',
//     });

//     const [error, setError] = useState('');

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         setError('');

//         if (formData.end_date < formData.start_date) {
//             setError('End date cannot be before start date.');
//             return;
//         }

//         console.log('Trip Data:', formData);

//         navigate('/my-trips');
//     };

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <Navbar />

//             <main className="max-w-3xl mx-auto p-6">
//                 <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
//                     <div className="mb-8">
//                         <h1 className="text-3xl font-bold text-gray-800">
//                             Plan a New Trip
//                         </h1>

//                         <p className="text-gray-500 mt-2">
//                             Enter your trip details to start planning your
//                             journey.
//                         </p>
//                     </div>

//                     {error && (
//                         <div className="mb-5 bg-red-100 border border-red-200 text-red-600 p-4 rounded-lg">
//                             {error}
//                         </div>
//                     )}

//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         {/* Trip Name */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Trip Name
//                             </label>

//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 placeholder="Example: Summer Vacation in Goa"
//                                 required
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         {/* Description */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Description
//                             </label>

//                             <textarea
//                                 name="description"
//                                 value={formData.description}
//                                 onChange={handleChange}
//                                 placeholder="Describe your trip..."
//                                 rows="5"
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                             />
//                         </div>

//                         {/* Dates */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Start Date
//                                 </label>

//                                 <input
//                                     type="date"
//                                     name="start_date"
//                                     value={formData.start_date}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     End Date
//                                 </label>

//                                 <input
//                                     type="date"
//                                     name="end_date"
//                                     value={formData.end_date}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>
//                         </div>

//                         {/* Buttons */}
//                         <div className="flex gap-4 pt-2">
//                             <button
//                                 type="submit"
//                                 className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
//                             >
//                                 Create Trip
//                             </button>

//                             <button
//                                 type="button"
//                                 onClick={() => navigate('/my-trips')}
//                                 className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default CreateTrip;
