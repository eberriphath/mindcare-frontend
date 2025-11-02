import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaUserMd, FaComments, FaBell, FaMapMarkedAlt } from "react-icons/fa";
import background from "../assets/background.png";

function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center text-center bg-cover bg-center p-6 pt-24"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Navbar />

      {/* Hero Section */}
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

      {/* Objectives Section */}
      <section className="max-w-5xl mt-20 text-white">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="text-lg leading-relaxed text-gray-100 mb-10">
          MindCare is designed to simplify access to mental health support by connecting clients with verified therapists and therapy centers, encouraging a safe and supportive community, and promoting mental wellness through smart tools and automation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/20 p-6 rounded-2xl border border-white/30 backdrop-blur-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-green-100">Simplify Therapy Access</h3>
            <p className="text-sm text-gray-200">
              Effortlessly find and book sessions with qualified therapists online.
            </p>
          </div>
          <div className="bg-white/20 p-6 rounded-2xl border border-white/30 backdrop-blur-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-green-100">Encourage Community</h3>
            <p className="text-sm text-gray-200">
              Engage in positive, supportive chat spaces to share and grow together.
            </p>
          </div>
          <div className="bg-white/20 p-6 rounded-2xl border border-white/30 backdrop-blur-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-green-100">Automate & Empower</h3>
            <p className="text-sm text-gray-200">
              Receive smart reminders, email updates, and manage therapy easily.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mt-20 text-gray-800">
        <h2 className="text-3xl font-bold mb-10 text-white">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white/70 p-6 rounded-2xl shadow-lg flex flex-col items-center hover:scale-105 transition">
            <FaUserMd className="text-green-700 text-3xl mb-3" />
            <h4 className="font-semibold">Therapist Management</h4>
            <p className="text-sm mt-2 text-gray-700">View, add, and manage verified therapists easily.</p>
          </div>
          <div className="bg-white/70 p-6 rounded-2xl shadow-lg flex flex-col items-center hover:scale-105 transition">
            <FaBell className="text-green-700 text-3xl mb-3" />
            <h4 className="font-semibold">Booking Reminders</h4>
            <p className="text-sm mt-2 text-gray-700">Get automated email reminders for your upcoming sessions.</p>
          </div>
          <div className="bg-white/70 p-6 rounded-2xl shadow-lg flex flex-col items-center hover:scale-105 transition">
            <FaMapMarkedAlt className="text-green-700 text-3xl mb-3" />
            <h4 className="font-semibold">Nearby Centers</h4>
            <p className="text-sm mt-2 text-gray-700">Locate therapy centers near you using Google Maps API.</p>
          </div>
          <div className="bg-white/70 p-6 rounded-2xl shadow-lg flex flex-col items-center hover:scale-105 transition">
            <FaComments className="text-green-700 text-3xl mb-3" />
            <h4 className="font-semibold">Townsquare Chat</h4>
            <p className="text-sm mt-2 text-gray-700">Join a supportive community chat for encouragement and connection.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gradient-to-b from-green-100 to-green-200 text-gray-700 py-10 mt-20 border-t border-green-300">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold text-green-700 mb-3">MindCare</h2>
            <p className="text-sm leading-relaxed">
              MindCare helps clients connect with verified therapists, book sessions, and nurture their mental health journey — all in one calm, nature-inspired space.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-green-700">About Us</Link></li>
              <li><Link to="/therapists" className="hover:text-green-700">Therapists</Link></li>
              <li><Link to="/bookings" className="hover:text-green-700">Book a Session</Link></li>
              <li><Link to="/community" className="hover:text-green-700">Townsquare Chat</Link></li>
              <li><Link to="/contact" className="hover:text-green-700">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact / Socials */}
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-3">Stay Connected</h3>
            <p className="text-sm mb-3">Have questions? Reach out anytime.</p>
            <p className="text-sm flex items-center gap-2">
              <FaEnvelope className="text-green-700" /> support@mindcare.com
            </p>
            <div className="flex gap-4 mt-4 text-green-700">
              <a href="#" aria-label="Facebook"><FaFacebook className="hover:text-green-900 transition-transform transform hover:scale-110" /></a>
              <a href="#" aria-label="Twitter"><FaTwitter className="hover:text-green-900 transition-transform transform hover:scale-110" /></a>
              <a href="#" aria-label="Instagram"><FaInstagram className="hover:text-green-900 transition-transform transform hover:scale-110" /></a>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="border-t border-green-300 mt-8 pt-4 text-center text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} <span className="font-semibold text-green-700">MindCare</span>. 
            All Rights Reserved. | Built with ❤️ for Mental Wellness.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
