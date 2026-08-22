import React from 'react';
import { Route } from 'react-router-dom';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-trip" element={<CreateTrip />} />
        </Routes>
    );
};

export default App;
