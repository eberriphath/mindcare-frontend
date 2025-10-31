import React, { useState, useEffect } from "react";
import { mockClientProfile, mockClientSessions } from "../mockData";
import backgroundImage from "../assets/background.png";

const useMock = true;

function ClientDashboard() {
  const [profile, setProfile] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState({});

  useEffect(() => {
    if (useMock) {
      setProfile(mockClientProfile);
      setTempProfile(mockClientProfile);
      setSessions(mockClientSessions);
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    setTempProfile({ ...tempProfile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setEditMode(false);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky header */}
      <header className="sticky top-0 bg-white border-b z-10 h-16 flex items-center shadow-sm">
        <div className="max-w-7xl mx-auto w-full px-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Client Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-right">
              <div className="font-medium">{profile?.name || "User"}</div>
              <div className="text-xs text-gray-500">{profile?.email}</div>
            </div>
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="w-9 h-9 rounded-full"
            />
          </div>
        </div>
      </header>

      {/* Main content with top padding to avoid overlap */}
      <main
        className="pt-16 min-h-screen bg-cover bg-center p-6"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Dashboard content remains unchanged */}
          <h1 className="text-3xl font-bold text-white text-center drop-shadow-lg">
            Client Dashboard
          </h1>

          {/* Profile Card */}
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-lg text-white space-y-2">
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
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={tempProfile.name}
                    onChange={handleChange}
                    className="w-full p-2 rounded text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={tempProfile.email}
                    onChange={handleChange}
                    className="w-full p-2 rounded text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={tempProfile.phone}
                    onChange={handleChange}
                    className="w-full p-2 rounded text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Gender</label>
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
                </div>

                <button
                  onClick={handleSave}
                  className="bg-blue-500 px-4 py-2 rounded text-white mt-2"
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p>
                  <b>Name:</b> {profile.name}
                </p>
                <p>
                  <b>Email:</b> {profile.email}
                </p>
                <p>
                  <b>Phone:</b> {profile.phone}
                </p>
                <p>
                  <b>Gender:</b> {profile.gender}
                </p>
              </div>
            )}
          </div>

          {/* Sessions */}
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-lg text-white">
            <h2 className="text-2xl font-semibold mb-4">Sessions</h2>
            {sessions.length === 0 ? (
              <p>No sessions found.</p>
            ) : (
              <div className="space-y-3">
                {sessions.map((s) => (
                  <div
                    key={s.id}
                    className="flex justify-between p-3 border border-white/20 rounded-lg"
                  >
                    <div>
                      <p>
                        <b>Therapist:</b> {s.therapist}
                      </p>
                      <p>
                        <b>Date:</b> {s.date} • <b>Time:</b> {s.time}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        s.status === "completed"
                          ? "bg-green-100/30 text-green-200"
                          : "bg-yellow-100/30 text-yellow-200"
                      }`}
                    >
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ClientDashboard;
