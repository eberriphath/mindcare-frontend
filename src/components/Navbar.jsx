import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-green-600">MindCare</h1>

      <div className="space-x-4">
        <Link to="/about" className="text-gray-700 hover:text-green-600">
          About
        </Link>

        {user ? (
          <>
            {user.role === "admin" && (
              <Link to="/admin" className="text-gray-700 hover:text-green-600">
                Dashboard
              </Link>
            )}
            {user.role === "therapist" && (
              <Link
                to="/therapist"
                className="text-gray-700 hover:text-green-600"
              >
                Dashboard
              </Link>
            )}
            {user.role === "client" && (
              <Link
                to="/client"
                className="text-gray-700 hover:text-green-600"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={logout}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
