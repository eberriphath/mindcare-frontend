import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // If no user, redirect to login
  if (!user || !user.role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user role is not allowed, redirect to their portal dashboard
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    const roleRedirects = {
      admin: "/portal/admin",
      therapist: "/portal/therapist",
      client: "/portal/client",
      user: "/portal/client",
    };

    const target = roleRedirects[user.role] || "/login";
    return <Navigate to={target} replace />;
  }

  // Otherwise, show the protected content
  return children;
};

export default ProtectedRoute;
