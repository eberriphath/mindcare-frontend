import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import backgroundImage from "../assets/background.png";

const BASE_URL = "http://127.0.0.1:5000"; // Flask backend

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [step, setStep] = useState(1); // Step 1: email/name, Step 2: role, Step 3: password
  const [isRegister, setIsRegister] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setStep(1);
    setFullName("");
    setEmail("");
    setRole("");
    setPassword("");
    setConfirmPassword("");
    setMessage("");
  };

  const handleNextStep = () => {
    if (step === 1 && (!email || (isRegister && !fullName))) {
      setMessage("Please fill in your details!");
      return;
    }
    if (step === 2 && !role) {
      setMessage("Please select a role!");
      return;
    }
    setMessage("");
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (isRegister && password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    const payload = isRegister
      ? { full_name: fullName, email, password, role }
      : { email, password, role };

    const endpoint = isRegister
      ? `${BASE_URL}/auth/register`
      : `${BASE_URL}/auth/login`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (isRegister) {
          setMessage("✅ Registered successfully! You can now log in.");
          setIsRegister(false);
          setStep(1);
        } else {
          login(data.user, data.access_token);
          setMessage("✅ Login successful!");
          localStorage.setItem("role", role);
          setTimeout(() => {
            if (role === "client") navigate("/portal/client");
            else if (role === "therapist") navigate("/portal/therapist");
            else if (role === "admin") navigate("/portal/admin");
            else navigate("/portal");
          }, 800);
        }
      } else {
        setMessage(data.error || "❌ Something went wrong.");
      }
    } catch (err) {
      console.error("Login/Register error:", err);
      setMessage("⚠️ Server error. Try again later.");
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
        <h2 className="text-2xl font-bold mb-4 text-white text-center">
          {isRegister ? "Register" : "Login"}
        </h2>

        {/* Step 1: Name & Email */}
        {step === 1 && (
          <>
            {isRegister && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full mb-4 p-2 rounded bg-white/20 text-white placeholder-white/70"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mb-4 p-2 rounded bg-white/20 text-white placeholder-white/70"
            />
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
            >
              Next
            </button>
          </>
        )}

        {/* Step 2: Role Selection */}
        {step === 2 && (
          <>
            <p className="text-white mb-4 text-center">Select Your Role</p>
            <div className="flex justify-between mb-4">
              {["client", "therapist", "admin"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`px-4 py-2 border rounded w-full mx-1 ${
                    role === r ? "bg-green-600 text-white" : "text-white"
                  }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
            >
              Next
            </button>
          </>
        )}

        {/* Step 3: Password */}
        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mb-4 p-2 rounded bg-white/20 text-white placeholder-white/70"
            />
            {isRegister && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full mb-4 p-2 rounded bg-white/20 text-white placeholder-white/70"
              />
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
            >
              {isLoading ? "Processing..." : isRegister ? "Register" : "Login"}
            </button>
          </>
        )}

        {message && <p className="text-red-300 mt-3 text-center">{message}</p>}

        <p className="mt-4 text-white text-center text-sm">
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={toggleMode}
            className="underline text-green-300 hover:text-green-400"
          >
            {isRegister ? "Login here" : "Register here"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
