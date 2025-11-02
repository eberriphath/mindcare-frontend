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
      <div className="flex items-center justify-center min-h-screen bg-green-800 text-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-800 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">👤 Client Dashboard</h1>
      <p className="mb-8">Welcome, {profile.name}. Track your therapy progress here.</p>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {["profile", "sessions", "mood"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded font-medium transition ${
              activeTab === tab
                ? "bg-white text-green-800"
                : "bg-green-700 hover:bg-green-600"
            }`}
          >
            {tab === "mood"
              ? "Mood Tracker"
              : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-green-700 p-6 rounded-lg shadow-md w-full max-w-md text-left space-y-2">
          <h2 className="text-2xl font-semibold mb-2">Profile</h2>
          <p><b>Name:</b> {profile.name}</p>
          <p><b>Email:</b> {profile.email}</p>
          <p><b>Phone:</b> {profile.phone}</p>
          <p><b>Gender:</b> {profile.gender}</p>
        </div>
      )}

      {/* Sessions Tab */}
      {activeTab === "sessions" && (
        <div className="bg-green-700 p-6 rounded-lg shadow-md w-full max-w-md text-left space-y-3">
          <h2 className="text-2xl font-semibold mb-2">Your Sessions</h2>
          {sessions.length === 0 ? (
            <p>No sessions booked yet.</p>
          ) : (
            sessions.map((s) => (
              <div
                key={s.id}
                className="flex justify-between items-center p-2 bg-green-600 rounded"
              >
                <div>
                  <p><b>Therapist:</b> {s.therapist}</p>
                  <p className="text-sm">
                    {s.date} • {s.time}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    s.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : s.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {s.status}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Mood Tracker Tab */}
      {activeTab === "mood" && (
        <div className="bg-green-700 p-6 rounded-lg shadow-md w-full max-w-md text-left">
          <h2 className="text-2xl font-semibold mb-4">Mood Tracker</h2>
          <MoodTracker />
        </div>
      )}

      {/* Logout Button */}
      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded mt-8"
      >
        Logout
      </button>
    </div>
  );
}
