import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10 shadow-md p-4 flex justify-between items-center">
      {/* Brand */}
      <Link
        to="/portal"
        className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500 drop-shadow-md"
      >
        MindCare
      </Link>

      {/* Links */}
      <div className="space-x-6 flex items-center text-white/90 font-medium">
        <Link
          to="/"
          className={`hover:text-green-300 transition ${
            location.pathname === "/" ? "text-green-400" : ""
          }`}
        >
          Home
        </Link>

        <Link
          to="/about"
          className={`hover:text-green-300 transition ${
            location.pathname === "/about" ? "text-green-400" : ""
          }`}
        >
          About
        </Link>

        <Link
          to="/contact"
          className={`hover:text-green-300 transition ${
            location.pathname === "/contact" ? "text-green-400" : ""
          }`}
        >
          Contact
        </Link>

        {user ? (
          <>
            {user.role === "admin" && (
              <Link
                to="/portal/admin"
                className="hover:text-green-300 transition"
              >
                Dashboard
              </Link>
            )}
            {user.role === "therapist" && (
              <Link
                to="/portal/therapist"
                className="hover:text-green-300 transition"
              >
                Dashboard
              </Link>
            )}
            {user.role === "client" && (
              <Link
                to="/portal/client"
                className="hover:text-green-300 transition"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={logout}
              className="ml-4 bg-green-500/90 hover:bg-green-400 text-white px-4 py-1.5 rounded-lg shadow-lg transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-1.5 rounded-lg shadow-md transition"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
