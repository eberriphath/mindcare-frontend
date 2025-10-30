import React from "react";
import backgroundImage from "../assets/background.png";

export default function About() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start bg-cover bg-center text-white p-8"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-4xl bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/30 space-y-6 mt-10">
        <h1 className="text-3xl font-bold text-center mb-6">About MindCare</h1>
        <p className="text-lg leading-relaxed">
          <b>MindCare</b> is a mental wellness platform designed to connect clients, therapists, 
          and administrators in one supportive digital space. Our mission is to make mental 
          health care accessible, personalized, and stigma-free.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white/10 rounded-xl p-5 border border-white/20">
            <h2 className="text-xl font-semibold mb-2">🎯 Our Vision</h2>
            <p className="text-gray-200 text-sm leading-relaxed">
              To empower individuals to take control of their mental health journey, 
              and to bridge the gap between technology and emotional well-being.
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-5 border border-white/20">
            <h2 className="text-xl font-semibold mb-2">💡 Our Mission</h2>
            <p className="text-gray-200 text-sm leading-relaxed">
              To provide secure and empathetic digital tools that help users access 
              therapy, track progress, and connect with certified mental health professionals.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">👥 Who We Serve</h2>
          <ul className="list-disc list-inside text-gray-200 text-sm space-y-2">
            <li><b>Clients</b> — seeking guidance, therapy, or self-care tools.</li>
            <li><b>Therapists</b> — offering professional mental health support.</li>
            <li><b>Admins</b> — managing platform operations and user experiences.</li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold mb-3">🧩 Our Core Values</h2>
          <p className="text-gray-200 text-sm leading-relaxed">
            Compassion • Privacy • Innovation • Connection
          </p>
        </div>

        <div className="text-center mt-10">
          <button className="px-6 py-2 rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-white text-sm font-medium transition">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
