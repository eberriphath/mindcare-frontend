import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/login";
import Home from "./pages/Home";
import About from "./pages/About";
import Portal from "./pages/Portal";

import TherapistDashboard from "./components/TherapistDashboard";
import ClientDashboard from "./components/ClientDashboard";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/portal" element={<Portal />} />

          {/* Protected dashboard routes */}
          <Route path="/portal" element={<DashboardLayout />}>
            <Route
              path="therapist"
              element={
                <ProtectedRoute allowedRoles={["therapist"]}>
                  <TherapistDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="client"
              element={
                <ProtectedRoute allowedRoles={["client", "user"]}>
                  <ClientDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    404 - Page Not Found
                  </h2>
                  <p className="text-gray-600 mb-4">
                    The page you're looking for doesn't exist.
                  </p>
                  <Link
                    to="/"
                    className="text-green-500 hover:text-green-600 underline"
                  >
                    Go Home
                  </Link>
                </div>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
