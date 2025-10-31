import React, { useState, useEffect } from "react";
import { mockTherapistProfile, mockTherapistAvailability, mockTherapistBookings } from "../mockData";
import backgroundImage from "../assets/background.png";

const useMock = true;

export default function TherapistDashboard() {
  const [profile, setProfile] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (useMock) {
      setProfile(mockTherapistProfile);
      setAvailability(mockTherapistAvailability);
      setBookings(mockTherapistBookings);
      setLoading(false);
      return;
    }

  
  }, []);

  const toggleAvailability = (id) =>
    setAvailability((slots) =>
      slots.map((slot) =>
        slot.id === id ? { ...slot, available: !slot.available } : slot
      )
    );

  const updateBooking = (id, status) =>
    setBookings((bks) =>
      bks.map((b) => (b.id === id ? { ...b, status } : b))
    );

  const addSlot = () =>
    setAvailability((slots) => [
      { id: Date.now(), date: "2024-02-01", time: "11:00", available: true },
      ...slots,
    ]);

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
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">Therapist Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-2">
          {["profile", "availability", "bookings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === tab
                  ? "bg-green-500 text-white"
                  : "bg-gray-200/30 text-white hover:bg-green-100/30"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-6">
          {/* Profile */}
          {activeTab === "profile" && (
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-lg text-white space-y-2">
              <h2 className="text-2xl font-semibold">Profile</h2>
              <p><b>Name:</b> {profile.name}</p>
              <p><b>Email:</b> {profile.email}</p>
              <p><b>Phone:</b> {profile.phone}</p>
              <p><b>Gender:</b> {profile.gender}</p>
              <p><b>Specialty:</b> {profile.specialty}</p>
            </div>
          )}

          {/* Availability */}
          {activeTab === "availability" && (
            <div className="glass-container overflow-hidden p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Availability</h2>
                <button
                  onClick={addSlot}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add Slot
                </button>
              </div>
              {availability.map((a) => (
                <div
                  key={a.id}
                  className="flex justify-between items-center p-3 border border-white/20 rounded-lg mb-2"
                >
                  <span>{a.date} - {a.time}</span>
                  <button
                    onClick={() => toggleAvailability(a.id)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      a.available ? "bg-green-100/30 text-green-200" : "bg-red-100/30 text-red-200"
                    } hover:opacity-80`}
                  >
                    {a.available ? "Available" : "Unavailable"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Bookings */}
          {activeTab === "bookings" && (
            <div className="glass-container overflow-hidden p-4">
              <h2 className="text-xl font-semibold text-white mb-4">Bookings</h2>
              {bookings.map((b) => (
                <div key={b.id} className="border border-white/20 rounded-lg p-3 mb-2 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span>{b.client} • {b.date} {b.time}</span>
                    <span className={`px-2 py-1 text-xs rounded ${
                      b.status==="confirmed" ? "bg-green-100/30 text-green-200" : "bg-yellow-100/30 text-yellow-200"
                    }`}>{b.status}</span>
                  </div>
                  {b.status === "pending" && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => updateBooking(b.id, "confirmed")}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateBooking(b.id, "cancelled")}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
