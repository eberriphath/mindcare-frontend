import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";

import Login from "./pages/login";
import AdminDashboard from "./components/AdminDashboard";
import TherapistDashboard from "./components/TherapistDashboard";
import ClientDashboard from "./components/ClientDashboard";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import PreviewPage from "./components/PreviewPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
       
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          <Route element={<DashboardLayout />}>
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/therapist/*"
              element={
                <ProtectedRoute allowedRoles={["therapist"]}>
                  <TherapistDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/client/*"
              element={
                <ProtectedRoute allowedRoles={["client"]}>
                  <ClientDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/preview/admin" element={<PreviewPage title="Admin Preview"><AdminDashboard /></PreviewPage>} />
          <Route path="/preview/therapist" element={<PreviewPage title="Therapist Preview"><TherapistDashboard /></PreviewPage>} />
          <Route path="/preview/client" element={<PreviewPage title="Client Preview"><ClientDashboard /></PreviewPage>} />

          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">404 - Page Not Found</h2>
                <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
                <Link to="/login" className="text-green-500 hover:text-green-600">
                  Return to Login
                </Link>
              </div>
            </div>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;