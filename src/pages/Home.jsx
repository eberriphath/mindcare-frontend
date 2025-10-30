import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import background from "../assets/background.png";

function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center bg-cover bg-center p-6 pt-24"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Navbar />

      <div className="bg-white/20 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 max-w-2xl border border-white/30 mt-10">
        <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
          Welcome to MindCare
        </h1>
        <p className="text-gray-100 mb-6">
          Your mental wellness companion — connect with therapists, track your mood,
          and take control of your emotional health, all in one place.
        </p>

        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="bg-white/30 text-white px-6 py-2 rounded hover:bg-white/50 transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
