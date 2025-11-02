import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import backgroundImage from "../assets/background.png";

const API_URL = "http://127.0.0.1:5000/auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Role passed from portal
  const selectedRole = location.state?.selectedRole || null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const payload = { email, password };
    if (selectedRole) payload.role = selectedRole;

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.access_token);
        setMessage("Login successful!");

        setTimeout(() => {
          if (selectedRole) navigate(`/portal/${selectedRole}`);
          else navigate("/portal");
        }, 1000);
      } else {
        setMessage(data.error || "Invalid credentials.");
      }
    } catch (err) {
      setMessage("Server error. Try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 p-8 bg-white/20 backdrop-blur-lg rounded-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-white">
          {selectedRole
            ? `Login as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`
            : "Login to MindCare"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-2 rounded bg-white/20 text-white placeholder-white/70"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-2 rounded bg-white/20 text-white placeholder-white/70"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
        >
          {isLoading ? "Processing..." : "Login"}
        </button>

        {message && <p className="text-red-400 mt-3">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
