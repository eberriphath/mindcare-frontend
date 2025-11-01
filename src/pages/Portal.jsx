import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background.png";

export default function Portal() {
  const navigate = useNavigate();

  const goToDashboard = (path) => {
    navigate(path);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-black/70 p-8 rounded-2xl shadow-xl w-96 text-center backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-6">MindCare Portal</h1>
        <p className="text-gray-300 mb-6">Choose a dashboard to explore</p>

        <div className="space-y-4">
          <button
            onClick={() => goToDashboard("/portal/client")}
            className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
          >
            Client Dashboard
          </button>

          <button
            onClick={() => goToDashboard("/portal/therapist")}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
          >
            Therapist Dashboard
          </button>

          <button
            onClick={() => goToDashboard("/portal/admin")}
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
          >
            Admin Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
