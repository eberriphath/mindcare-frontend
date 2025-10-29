import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://127.0.0.1:5000/auth";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const endpoint = isLogin ? "/login" : "/register";
    const payload = isLogin
      ? { email, password }
      : { full_name: fullName, email, password };

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {   
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          login(data.user, data.access_token);
          const from = location.state?.from?.pathname || `/${data.user.role}`;  
          navigate(from, { replace: true });
        } else {
          setIsLogin(true);
          setFullName("");
          setEmail("");
          setPassword("");
          setMessage("Registration successful! Please log in.");
        }
      } else {
        setMessage(data.error || data.message || "Something went wrong.");
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
      style={{ backgroundImage: "url('/src/assets/background.png')" }}  
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative w-full max-w-md bg-white/20 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 border border-white/30">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white drop-shadow-lg">
          {isLogin ? "Login to MindCare" : "Create Your MindCare Account"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 backdrop-blur-sm focus:ring-2 focus:ring-green-400 focus:border-transparent focus:outline-none"
              required
            />
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
            className={`w-full py-3 rounded-lg bg-green-500/80 text-white font-semibold transition duration-200 shadow-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-500 hover:shadow-lg"
            }`}  
          >
            {isLoading ? "Processing..." : isLogin ? "Login" : "Register"}
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
      </div>
    </div>
  );
};

export default AuthPage;
