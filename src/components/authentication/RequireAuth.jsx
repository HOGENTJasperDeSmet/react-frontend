import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router';

export default function RequireAuth({ children }) {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading</div>;
    }

    if (isAuthenticated) {
        return children;
    }

    return <Navigate to="/login" />; // 👈 4
}
