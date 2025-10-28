import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://127.0.0.1:5000/user";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("client");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const endpoint = isLogin ? "/login" : "/register";
    const payload = isLogin
      ? { email, password }
      : { name, email, password, role };

    if (!isLogin && role === "admin") {
      const ok = window.confirm(
        "You are attempting to register as an admin. Are you sure?"
      );
      if (!ok) {
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(isLogin ? "Login successful!" : "Registration successful!");
        if (isLogin) {
          const userData = {
            email: data.email,
            name: data.name,
            role: data.role || "client",
            id: data.id,
          };
          login(userData, data.access_token);
          const from = location.state?.from?.pathname || `/${userData.role}`;
          navigate(from, { replace: true });
        } else {
          setIsLogin(true);
          setEmail("");
          setPassword("");
          setMessage("Registration successful! Please log in.");
        }
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error connecting to server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/src/assets/background.png')`,
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-md bg-white/20 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 border border-white/30">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white drop-shadow-lg">
          {isLogin ? "Login to MindCare" : "Create Your MindCare Account"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 backdrop-blur-sm focus:ring-2 focus:ring-green-400 focus:border-transparent focus:outline-none"
                required
              />

              <label className="text-sm text-gray-200">Register as</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="p-3 rounded-lg bg-white/10 border border-white/20 text-white backdrop-blur-sm focus:ring-2 focus:ring-green-400 focus:border-transparent focus:outline-none"
                required
              >
                <option value="client">Client</option>
                <option value="therapist">Therapist</option>
                <option value="admin">Admin</option>
              </select>
            </>
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 backdrop-blur-sm focus:ring-2 focus:ring-green-400 focus:border-transparent focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 backdrop-blur-sm focus:ring-2 focus:ring-green-400 focus:border-transparent focus:outline-none"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg bg-green-500/80 text-white font-semibold transition duration-200 shadow-md
              ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-500 hover:shadow-lg"}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : isLogin ? (
              "Login"
            ) : (
              "Register"
            )}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm text-gray-200 mt-4">{message}</p>
        )}

        <p className="text-center text-gray-300 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
            className="text-green-300 font-semibold hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

        <div className="text-center mt-4 text-sm text-gray-300">
          Quick access (preview):{" "}
          <Link to="/preview/admin" className="text-green-300 hover:underline mx-1">
            Admin
          </Link>{" "}
          |{" "}
          <Link
            to="/preview/therapist"
            className="text-green-300 hover:underline mx-1"
          >
            Therapist
          </Link>{" "}
          |{" "}
          <Link
            to="/preview/client"
            className="text-green-300 hover:underline mx-1"
          >
            Client
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
