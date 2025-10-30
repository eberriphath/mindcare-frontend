import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://127.0.0.1:5000";

export default function TherapistDashboard() {
  const { user } = useAuth();
  const [profile] = useState({ name: "Dr. You", email: "you@example.com", phone: "02833572869", gender: "Male" });
  const [availability, setAvailability] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    setAvailability([
      { id: 1, date: "2024-01-20", time: "09:00", available: true },
      { id: 2, date: "2024-01-20", time: "10:00", available: false },
    ]);
    setBookings([
      { id: 1, client: "John Doe", date: "2024-01-20", time: "10:00", status: "pending" },
    ]);
    setLoading(false);
  }, [user.id]);

  const toggleAvailability = (id) =>
    setAvailability(a => a.map(slot => slot.id === id ? { ...slot, available: !slot.available } : slot));

  const updateBooking = (id, status) =>
    setBookings(b => b.map(book => book.id === id ? { ...book, status } : book));

  const addSlot = () =>
    setAvailability(a => [{ id: Date.now(), date: "2024-02-01", time: "11:00", available: true }, ...a]);

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen flex bg-cover bg-center" style={{ backgroundImage: `url('/src/assets/background.png')` }}>
      <nav className="w-64 bg-white/20 backdrop-blur-2xl p-6 border-r border-white/30 text-white flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <button onClick={() => setActiveTab("profile")} className={`py-2 px-3 rounded ${activeTab==="profile" ? "bg-green-500/80" : "hover:bg-green-500/50"}`}>Profile</button>
        <button onClick={() => setActiveTab("availability")} className={`py-2 px-3 rounded ${activeTab==="availability" ? "bg-green-500/80" : "hover:bg-green-500/50"}`}>Availability</button>
        <button onClick={() => setActiveTab("bookings")} className={`py-2 px-3 rounded ${activeTab==="bookings" ? "bg-green-500/80" : "hover:bg-green-500/50"}`}>Bookings</button>
      </nav>

      <main className="flex-1 p-6 space-y-6">
        {activeTab === "profile" && (
          <div className="bg-white/20 backdrop-blur-2xl rounded-2xl shadow-2xl p-6 border border-white/30 text-white">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <p><b>Name:</b> {profile.name}</p>
            <p><b>Email:</b> {profile.email}</p>
            <p><b>Phone:</b> {profile.phone}</p>
            <p><b>Gender:</b> {profile.gender}</p>
          </div>
        )}

        {activeTab === "availability" && (
          <div className="bg-white/20 backdrop-blur-2xl rounded-2xl shadow-2xl p-4 border border-white/30">
            <div className="flex justify-between mb-4">
              <h3 className="font-medium text-white">Availability</h3>
              <button onClick={addSlot} className="px-3 py-1 bg-green-500 text-white rounded">Add Slot</button>
            </div>
            <div className="space-y-2">
              {availability.map(a => (
                <div key={a.id} className="flex justify-between p-3 border rounded border-white/30 text-white">
                  <div>{a.date} <span className="text-sm text-gray-200">{a.time}</span></div>
                  <button onClick={() => toggleAvailability(a.id)} className={`px-3 py-1 rounded text-sm ${a.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {a.available ? "Available" : "Unavailable"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="bg-white/20 backdrop-blur-2xl rounded-2xl shadow-2xl p-4 border border-white/30 text-white">
            <h3 className="font-medium mb-3">Bookings</h3>
            <div className="space-y-3">
              {bookings.map(b => (
                <div key={b.id} className="border rounded p-3 border-white/30">
                  <div className="flex justify-between">
                    <div>{b.client} <span className="text-sm text-gray-200">{b.date} • {b.time}</span></div>
                    <span className={`px-2 py-1 rounded text-xs ${b.status==="confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{b.status}</span>
                  </div>
                  {b.status==="pending" && (
                    <div className="mt-2 flex gap-2">
                      <button onClick={() => updateBooking(b.id, "confirmed")} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Confirm</button>
                      <button onClick={() => updateBooking(b.id, "cancelled")} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Cancel</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
