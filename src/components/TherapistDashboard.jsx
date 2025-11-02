import React from "react";
import { useNavigate } from "react-router-dom";

export default function TherapistDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/portal");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-800 text-white">
      <h1 className="text-4xl font-bold mb-4">🧑‍⚕️ Therapist Dashboard</h1>
      <p className="mb-8">Welcome, Therapist. Manage sessions and clients here.</p>
      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
