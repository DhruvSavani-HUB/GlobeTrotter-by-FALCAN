import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import MyTrips from './pages/MyTrips.jsx';
import CreateTrip from './pages/CreateTrip.jsx';
import TripDetails from './pages/TripDetails.jsx';
import EditTrip from './pages/EditTrip.jsx';
import CitySearch from './pages/CitySearch.jsx';
import ActivitySearch from './pages/ActivitySearch.jsx';
import Budget from './pages/Budget.jsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-trips" element={<MyTrips />} />
            <Route path="/create-trip" element={<CreateTrip />} />
            <Route path="/trip/:id" element={<TripDetails />} />
            <Route path="/trip/:id/edit" element={<EditTrip />} />
            <Route path="/cities" element={<CitySearch />} />
            <Route path="/activities" element={<ActivitySearch />} />
            <Route path="/budget" element={<Budget />} />
        </Routes>
    );
}

export default App;
