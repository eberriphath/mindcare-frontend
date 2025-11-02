import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/login";
import Portal from "./pages/Portal";

import ClientDashboard from "./components/ClientDashboard";
import TherapistDashboard from "./components/TherapistDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Navbar from "./components/Navbar";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ Hide Navbar on dashboard pages
function LayoutWithNavbar({ children }) {
  const location = useLocation();
  const hideNavbar =
    location.pathname.startsWith("/portal/client") ||
    location.pathname.startsWith("/portal/therapist") ||
    location.pathname.startsWith("/portal/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* 🏠 Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />

      {/* 🚪 Protected Portal */}
      <Route
        path="/portal"
        element={
          <ProtectedRoute>
            <Portal />
          </ProtectedRoute>
        }
      />

      {/* 💼 Dashboards with role-based access */}
      <Route
        path="/portal/client"
        element={
          <ProtectedRoute allowedRoles={["client", "user"]}>
            <ClientDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/portal/therapist"
        element={
          <ProtectedRoute allowedRoles={["therapist"]}>
            <TherapistDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/portal/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* ❌ 404 Fallback */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                404 - Page Not Found
              </h2>
              <p className="text-gray-600 mb-4">
                The page you’re looking for doesn’t exist.
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
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <LayoutWithNavbar>
          <AppRoutes />
        </LayoutWithNavbar>
      </AuthProvider>
    </Router>
  );
}

export default App;
