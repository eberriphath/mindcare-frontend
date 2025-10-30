import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-xl border-b border-white/30 shadow-sm p-4 flex justify-between items-center">
      <Link
        to="/home"
        className="text-2xl font-bold text-white drop-shadow-md hover:text-green-300 transition"
      >
        MindCare
      </Link>

      <div className="space-x-4 flex items-center">
        <Link
          to="/about"
          className="text-white/90 hover:text-green-300 transition font-medium"
        >
          About
        </Link>

        {user ? (
          <>
            {user.role === "admin" && (
              <Link
                to="/admin"
                className="text-white/90 hover:text-green-300 transition font-medium"
              >
                Dashboard
              </Link>
            )}
            {user.role === "therapist" && (
              <Link
                to="/therapist"
                className="text-white/90 hover:text-green-300 transition font-medium"
              >
                Dashboard
              </Link>
            )}
            {user.role === "client" && (
              <Link
                to="/client"
                className="text-white/90 hover:text-green-300 transition font-medium"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={logout}
              className="bg-green-500/90 hover:bg-green-400 text-white font-medium px-4 py-1.5 rounded-lg shadow-md transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-green-500/90 hover:bg-green-400 text-white font-medium px-4 py-1.5 rounded-lg shadow-md transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
