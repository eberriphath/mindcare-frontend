import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Define sidebar links based on role
  const linksByRole = {
    admin: [
      { name: "Overview", path: "/portal/admin" },
      { name: "Users", path: "/portal/admin/users" },
      { name: "Therapists", path: "/portal/admin/therapists" },
      { name: "Sessions", path: "/portal/admin/sessions" },
    ],
    therapist: [
      { name: "Dashboard", path: "/portal/therapist" },
      { name: "My Schedule", path: "/portal/therapist/schedule" },
      { name: "Bookings", path: "/portal/therapist/bookings" },
      { name: "Messages", path: "/portal/therapist/messages" },
    ],
    client: [
      { name: "Dashboard", path: "/portal/client" },
      { name: "My Sessions", path: "/portal/client/sessions" },
      { name: "Mood Tracker", path: "/portal/client/mood" },
      { name: "Therapists", path: "/portal/client/therapists" },
    ],
  };

  const role = user?.role || "client"; // fallback for testing
  const links = linksByRole[role] || [];

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col justify-between fixed left-0 top-0">
      {/* Logo & User Info */}
      <div>
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-green-400">MindCare</h2>
          <p className="text-sm text-gray-400 mt-1 capitalize">
            {user ? user.role : "guest"}
          </p>
        </div>

        {/* Links */}
        <nav className="mt-6 flex flex-col space-y-1">
          {links.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-6 py-3 hover:bg-gray-800 transition ${
                  active ? "bg-gray-800 text-green-400 font-semibold" : "text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-6 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full text-left px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-medium"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
