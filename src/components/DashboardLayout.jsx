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
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8 text-green-400">
          MindCare Portal
        </h2>

        <nav className="flex flex-col space-y-4">
          {user?.role === "client" && (
            <>
              <Link
                to="/portal/client"
                className="hover:text-green-400 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/portal/client/sessions"
                className="hover:text-green-400 transition-colors"
              >
                My Sessions
              </Link>
              <Link
                to="/portal/client/mood"
                className="hover:text-green-400 transition-colors"
              >
                Mood Tracker
              </Link>
            </>
          )}

          {user?.role === "therapist" && (
            <>
              <Link
                to="/portal/therapist"
                className="hover:text-green-400 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/portal/therapist/availability"
                className="hover:text-green-400 transition-colors"
              >
                Availability
              </Link>
              <Link
                to="/portal/therapist/bookings"
                className="hover:text-green-400 transition-colors"
              >
                Bookings
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link
                to="/portal/admin"
                className="hover:text-green-400 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/portal/admin/users"
                className="hover:text-green-400 transition-colors"
              >
                Manage Users
              </Link>
              <Link
                to="/portal/admin/reports"
                className="hover:text-green-400 transition-colors"
              >
                Reports
              </Link>
            </>
          )}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
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
          <Outlet /> {/* This renders the dashboard content dynamically */}
        </section>
      </main>
    </div>
  );
}
