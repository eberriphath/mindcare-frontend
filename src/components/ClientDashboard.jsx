import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MoodTracker from "./MoodTracker";
import { mockClientProfile, mockClientSessions } from "../mockData";

const useMock = true;

export default function ClientDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (useMock) {
      setProfile(mockClientProfile);
      setSessions(mockClientSessions);
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/portal");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-emerald-900 text-white">
        <div className="border-4 border-emerald-400 rounded-full h-12 w-12 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-700 text-white flex flex-col items-center py-10 px-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-2">
          Client Dashboard
        </h1>
        <p className="text-center text-gray-200 mb-8">
          Welcome, <span className="font-semibold text-emerald-300">{profile.name}</span>.  
          Manage your sessions and track your mood here.
        </p>

        <div className="flex justify-center gap-4 mb-6">
          {["profile", "sessions", "mood"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg font-medium tracking-wide transition-all ${
                activeTab === tab
                  ? "bg-emerald-300 text-emerald-900 font-semibold"
                  : "bg-emerald-800 hover:bg-emerald-700 text-white/90"
              }`}
            >
              {tab === "mood"
                ? "Mood Tracker"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "profile" && (
          <div className="bg-emerald-800/50 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 border-b border-emerald-400 pb-2">
              Profile Information
            </h2>
            <ul className="space-y-2 text-gray-100">
              <li><span className="font-semibold text-emerald-300">Name:</span> {profile.name}</li>
              <li><span className="font-semibold text-emerald-300">Email:</span> {profile.email}</li>
              <li><span className="font-semibold text-emerald-300">Phone:</span> {profile.phone}</li>
              <li><span className="font-semibold text-emerald-300">Gender:</span> {profile.gender}</li>
            </ul>
          </div>
        )}

        {activeTab === "sessions" && (
          <div className="bg-emerald-800/50 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 border-b border-emerald-400 pb-2">
              Your Therapy Sessions
            </h2>
            {sessions.length === 0 ? (
              <p className="text-gray-300">No sessions booked yet.</p>
            ) : (
              <div className="space-y-3">
                {sessions.map((s) => (
                  <div
                    key={s.id}
                    className="flex justify-between items-center bg-emerald-700/70 p-4 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-emerald-100">
                        {s.therapist}
                      </p>
                      <p className="text-sm text-gray-300">
                        {s.date} • {s.time}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-sm rounded-lg font-medium ${
                        s.status === "completed"
                          ? "bg-green-200 text-green-900"
                          : s.status === "pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "mood" && (
          <div className="bg-emerald-800/50 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 border-b border-emerald-400 pb-2">
              Mood Tracker
            </h2>
            <MoodTracker />
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold text-white shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}