import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/background.png";
import AuthContext from "../context/AuthContext";

const Portal = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-lg mb-4">You must log in first.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-green-600 px-6 py-3 rounded-2xl hover:bg-green-700 transition-all"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const roles = ["therapist", "client"];

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-center px-4 mt-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Welcome, {user.username} 🌿
        </h1>
        <p className="text-gray-200 mb-10 max-w-md text-lg">
          Select your role to continue to your dashboard
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => navigate(`/portal/${role}`)}
              className={`px-6 py-3 rounded-2xl text-white transition-all shadow-lg ${
                role === "therapist"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-12 px-6 py-3 bg-gray-700 rounded-2xl hover:bg-gray-800 text-white transition-all shadow-lg"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Portal;
