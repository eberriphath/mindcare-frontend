import React from "react";
import { useNavigate } from "react-router-dom";

const Portal = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    // Save role for persistence
    localStorage.setItem("selectedRole", role);

    // Pass it via React Router too
    navigate("/login", { state: { selectedRole: role } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-800 to-indigo-700 text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome to MindCare Portal</h1>
      <p className="mb-6 text-lg">Choose your role to log in:</p>

      <div className="flex flex-col gap-4 w-72">
        <button
          onClick={() => handleRoleSelect("client")}
          className="bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold"
        >
          Client
        </button>

        <button
          onClick={() => handleRoleSelect("therapist")}
          className="bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
        >
          Therapist
        </button>

        <button
          onClick={() => handleRoleSelect("admin")}
          className="bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold"
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default Portal;
