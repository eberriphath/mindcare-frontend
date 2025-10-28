import React, { useState, useEffect } from "react";
import { mockClientProfile, mockClientSessions } from "../mockData";


const API_URL = "http://127.0.0.1:5000";

export default function ClientDashboard() {
  const [profile, setProfile] = useState(mockClientProfile);
  const [sessions, setSessions] = useState(mockClientSessions);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await fetch(`${API_URL}/client/profile`);
        const profileData = await profileRes.json();
        setProfile(profileData);

        const sessionsRes = await fetch(`${API_URL}/client/sessions`);
        const sessionsData = await sessionsRes.json();
        setSessions(sessionsData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/client/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      setEditOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const bookSession = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const therapist = form.therapist.value;
    const date = form.date.value;
    const time = form.time.value;

    try {
      const res = await fetch(`${API_URL}/client/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ therapist, date, time }),
      });
      if (!res.ok) throw new Error("Failed to book session");
      const newSession = await res.json();
      setSessions((prev) => [newSession, ...prev]);
      setBookingOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error booking session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative p-6"
      style={{ backgroundImage: `url('/src/assets/background.png')` }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative w-full max-w-6xl space-y-6">
        <div className="flex gap-6 items-start">
          {/* Profile Card */}
          <div className="bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl p-6 shadow-lg w-72 text-white">
            <h3 className="font-medium text-lg">Profile</h3>
            <p className="mt-2"><b>{profile.name}</b></p>
            <p className="text-sm">{profile.email}</p>
            <p className="text-sm">{profile.phone}</p>
            <p className="text-sm">{profile.gender}</p>
            <button
              className="mt-4 w-full bg-green-500/80 hover:bg-green-500 py-2 rounded-lg font-semibold"
              onClick={() => setEditOpen(true)}
            >
              Edit Profile
            </button>
          </div>

          {/* Sessions Card */}
          <div className="flex-1 bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl p-6 shadow-lg text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg">My Sessions</h3>
              <button
                onClick={() => setBookingOpen(true)}
                className="bg-green-500/80 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
              >
                Book Session
              </button>
            </div>

            <div className="space-y-3">
              {sessions.map((s) => (
                <div
                  key={s.id}
                  className="border border-white/30 rounded-lg p-3 flex justify-between items-start"
                >
                  <div>
                    <div className="font-medium">{s.therapist}</div>
                    <div className="text-sm text-gray-200">
                      {s.date} • {s.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`px-2 py-1 text-xs rounded ${
                        s.status === "scheduled"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {s.status}
                    </div>
                    {s.status === "scheduled" && (
                      <button
                        onClick={() => alert("Joining session...")}
                        className="mt-2 text-xs text-green-300"
                      >
                        Join
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {editOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <form
              onSubmit={saveProfile}
              className="bg-white/20 backdrop-blur-2xl rounded-2xl p-6 w-80 text-white space-y-4"
            >
              <h4 className="font-semibold text-lg">Edit Profile</h4>
              <input
                className="w-full p-2 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none"
                placeholder="Full Name"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                required
              />
              <select
                className="w-full p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
                value={profile.gender}
                onChange={(e) =>
                  setProfile({ ...profile, gender: e.target.value })
                }
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                className="w-full p-2 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none"
                placeholder="Email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                required
              />
              <input
                className="w-full p-2 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none"
                placeholder="Phone"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                required
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-500/80 hover:bg-green-500 py-2 rounded-lg font-semibold"
                  disabled={loading}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg"
                  onClick={() => setEditOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Book Session Modal */}
        {bookingOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <form
              onSubmit={bookSession}
              className="bg-white/20 backdrop-blur-2xl rounded-2xl p-6 w-80 text-white space-y-4"
            >
              <h4 className="font-semibold text-lg">Book Session</h4>
              <input
                type="text"
                name="therapist"
                placeholder="Therapist Name"
                className="w-full p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
                required
              />
              <input
                type="date"
                name="date"
                className="w-full p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
                required
              />
              <input
                type="time"
                name="time"
                className="w-full p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
                required
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-500/80 hover:bg-green-500 py-2 rounded-lg font-semibold"
                  disabled={loading}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg"
                  onClick={() => setBookingOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
