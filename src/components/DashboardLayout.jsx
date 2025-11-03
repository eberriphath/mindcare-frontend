import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white flex flex-col p-6 space-y-6">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold mb-2 text-green-400">
            MindCare Portal
          </h2>
          <p className="text-xs text-gray-400 leading-snug">
            MindCare: Mental Wellness & Therapy Management System
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-4 text-sm font-medium">
          {user?.role === "client" && (
            <>
              <Link
                to="/portal/client"
                className="hover:text-green-400 transition-colors"
              >
                🏠 Dashboard
              </Link>
              <Link
                to="/portal/client/sessions"
                className="hover:text-green-400 transition-colors"
              >
                💬 My Sessions
              </Link>
              <Link
                to="/portal/client/mood"
                className="hover:text-green-400 transition-colors"
              >
                😊 Mood Tracker
              </Link>
            </>
          )}

          {user?.role === "therapist" && (
            <>
              <Link
                to="/portal/therapist"
                className="hover:text-green-400 transition-colors"
              >
                🧘 Therapist Dashboard
              </Link>
              <Link
                to="/portal/therapist/availability"
                className="hover:text-green-400 transition-colors"
              >
                📅 Availability
              </Link>
              <Link
                to="/portal/therapist/bookings"
                className="hover:text-green-400 transition-colors"
              >
                📖 Bookings
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link
                to="/portal/admin"
                className="hover:text-green-400 transition-colors"
              >
                🛡️ Admin Dashboard
              </Link>
              <Link
                to="/portal/admin/users"
                className="hover:text-green-400 transition-colors"
              >
                👥 Manage Users
              </Link>
              <Link
                to="/portal/admin/reports"
                className="hover:text-green-400 transition-colors"
              >
                📊 Reports
              </Link>
            </>
          )}
        </nav>

        {/* Quick Info Section */}
        <div className="mt-6 border-t border-gray-700 pt-4 text-xs text-gray-400 leading-snug">
          <p className="font-semibold text-green-400 mb-1">Project Overview</p>
          <p>
            MindCare simplifies access to therapy and mental health support by
            connecting clients, therapists, and admins on one secure platform.
          </p>
          <p className="mt-2">
            🌿 “Empowering wellness through connection and care.”
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Welcome, {user?.username || "Guest"}
          </h1>
          <span className="text-gray-500 text-sm capitalize">
            Role: {user?.role || "N/A"}
          </span>
        </header>

        <section className="bg-white p-6 rounded-2xl shadow-md">
          <Outlet /> {/* Renders dashboard content dynamically */}
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-xs mt-6">
          © {new Date().getFullYear()} MindCare — Mental Wellness & Therapy
          Management System
        </footer>
      </main>
    </div>
  );
}
