import React from "react";
import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null;

    if (!isAuthenticated) {
        return <Navigate to="/market" replace />;
    }

    return children;
};

export default PrivateRoute;
