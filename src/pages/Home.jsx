import React from "react";
import { Link } from "react-router-dom";
import background from "../assets/background.png";

function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-white/20 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 max-w-2xl border border-white/30">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to MindCare</h1>
        <p className="text-gray-100 mb-6">
          Your mental wellness companion — connect with therapists, track your mood,
          and take control of your emotional health, all in one place.
        </p>

        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="bg-white/30 text-white px-6 py-2 rounded hover:bg-white/50"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
