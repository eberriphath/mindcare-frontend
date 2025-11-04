import React from "react";
import { useNavigate } from "react-router-dom";

export default function TherapistDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/portal");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-700 text-white flex flex-col items-center py-10 px-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-2">Therapist Dashboard</h1>
        <p className="text-gray-200 mb-8">
          Welcome, <span className="font-semibold text-blue-300">Therapist</span>.  
          Manage your clients, sessions, and schedules efficiently.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all">
            View Clients
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all">
            Manage Sessions
          </button>
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all">
            Availability
          </button>
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all">
            Messages
          </button>
        </div>

        <div className="flex justify-center">
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold text-white shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
