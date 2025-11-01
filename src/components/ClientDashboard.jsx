import React, { useState, useEffect } from "react";
import MoodTracker from "./MoodTracker";
import { mockClientProfile, mockClientSessions } from "../mockData";
import backgroundImage from "../assets/background.png";

const useMock = true;

export default function ClientDashboard() {
  const [profile, setProfile] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState({});
  const [activeTab, setActiveTab] = useState("profile");
  const [newSession, setNewSession] = useState({
    therapist: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (useMock) {
      setProfile(mockClientProfile);
      setTempProfile(mockClientProfile);
      setSessions(mockClientSessions);
      setLoading(false);
    }
  }, []);

  // Profile handlers
  const handleChange = (e) =>
    setTempProfile({ ...tempProfile, [e.target.name]: e.target.value });
  const handleSave = () => {
    setProfile(tempProfile);
    setEditMode(false);
  };

  // Booking logic
  const handleAddSession = () => {
    if (!newSession.therapist || !newSession.date || !newSession.time) return;

    const session = {
      id: Date.now(),
      ...newSession,
      status: "pending",
    };

    setSessions((prev) => [session, ...prev]);
    setNewSession({ therapist: "", date: "", time: "" });
  };

  const handleCancelSession = (id) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "cancelled" } : s
      )
    );
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
      </div>
    );

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-5xl mx-auto space-y-6 bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-lg text-white">

        {/* Tabs */}
        <div className="flex gap-3 justify-center mb-4">
          {["profile", "sessions", "booking", "mood"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === tab
                  ? "bg-green-500 text-white"
                  : "bg-white/20 hover:bg-green-100/20 text-gray-200"
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
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Profile</h2>
              <button
                className="bg-green-500 px-3 py-1 rounded text-white text-sm"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
            </div>

            {editMode ? (
              <div className="space-y-3">
                <input
                  type="text"
                  name="name"
                  value={tempProfile.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded text-black"
                  placeholder="Name"
                />
                <input
                  type="email"
                  name="email"
                  value={tempProfile.email}
                  onChange={handleChange}
                  className="w-full p-2 rounded text-black"
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="phone"
                  value={tempProfile.phone}
                  onChange={handleChange}
                  className="w-full p-2 rounded text-black"
                  placeholder="Phone"
                />
                <select
                  name="gender"
                  value={tempProfile.gender}
                  onChange={handleChange}
                  className="w-full p-2 rounded text-black"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 px-4 py-2 rounded text-white mt-2"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <p><b>Name:</b> {profile.name}</p>
                <p><b>Email:</b> {profile.email}</p>
                <p><b>Phone:</b> {profile.phone}</p>
                <p><b>Gender:</b> {profile.gender}</p>
              </div>
            )}
          </div>
        )}

        {/* Sessions Tab */}
        {activeTab === "sessions" && (
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold mb-2">Sessions</h2>
            {sessions.length === 0 ? (
              <p>No sessions booked yet.</p>
            ) : (
              sessions.map((s) => (
                <div
                  key={s.id}
                  className="flex justify-between p-3 border border-white/20 rounded-lg items-center"
                >
                  <div>
                    <p><b>Therapist:</b> {s.therapist}</p>
                    <p><b>Date:</b> {s.date} • <b>Time:</b> {s.time}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        s.status === "completed"
                          ? "bg-green-100/30 text-green-200"
                          : s.status === "pending"
                          ? "bg-yellow-100/30 text-yellow-200"
                          : "bg-red-100/30 text-red-200"
                      }`}
                    >
                      {s.status}
                    </span>
                    {s.status === "pending" && (
                      <button
                        onClick={() => handleCancelSession(s.id)}
                        className="px-2 py-1 text-xs bg-red-500 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Booking Tab */}
        {activeTab === "booking" && (
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold mb-2">Book a Session</h2>
            <input
              type="text"
              placeholder="Therapist Name"
              value={newSession.therapist}
              onChange={(e) =>
                setNewSession({ ...newSession, therapist: e.target.value })
              }
              className="w-full p-2 rounded text-black"
            />
            <input
              type="date"
              value={newSession.date}
              onChange={(e) =>
                setNewSession({ ...newSession, date: e.target.value })
              }
              className="w-full p-2 rounded text-black"
            />
            <input
              type="time"
              value={newSession.time}
              onChange={(e) =>
                setNewSession({ ...newSession, time: e.target.value })
              }
              className="w-full p-2 rounded text-black"
            />
            <button
              onClick={handleAddSession}
              className="bg-green-500 px-4 py-2 rounded text-white mt-2"
            >
              Book Session
            </button>
          </div>
        )}

        {/* Mood Tracker Tab */}
        {activeTab === "mood" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Mood Tracker</h2>
            <MoodTracker />
          </div>
        )}
      </div>
    </div>
  );
}
