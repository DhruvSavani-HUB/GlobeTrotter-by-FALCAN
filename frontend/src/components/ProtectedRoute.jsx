import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    let token = null;

    try {
        token = localStorage.getItem('token');
    } catch (error) {
        console.warn('Unable to access localStorage:', error);
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
