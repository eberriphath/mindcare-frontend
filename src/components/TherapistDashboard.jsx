import React, { useState, useEffect } from "react";

export default function TherapistDashboard() {
  const [profile] = useState({
    name: "Dr. You",
    email: "you@example.com",
    phone: "02833572869",
    gender: "Male",
  });
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
  }, []);

  const toggleAvailability = (id) =>
    setAvailability((slots) =>
      slots.map((slot) => (slot.id === id ? { ...slot, available: !slot.available } : slot))
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
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2">
        {["profile", "availability", "bookings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === tab
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-green-100"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white p-6 rounded-2xl shadow space-y-3">
            <h2 className="text-2xl font-semibold mb-2">Profile</h2>
            <p><b>Name:</b> {profile.name}</p>
            <p><b>Email:</b> {profile.email}</p>
            <p><b>Phone:</b> {profile.phone}</p>
            <p><b>Gender:</b> {profile.gender}</p>
          </div>
        )}

        {/* Availability Tab */}
        {activeTab === "availability" && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Availability</h2>
              <button onClick={addSlot} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                Add Slot
              </button>
            </div>
            <div className="space-y-2">
              {availability.map((a) => (
                <div key={a.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <span>{a.date} - {a.time}</span>
                  <button
                    onClick={() => toggleAvailability(a.id)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      a.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    } hover:opacity-80`}
                  >
                    {a.available ? "Available" : "Unavailable"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Bookings</h2>
            <div className="space-y-3">
              {bookings.map((b) => (
                <div key={b.id} className="border rounded-lg p-3 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span>{b.client} • {b.date} {b.time}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      b.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {b.status}
                    </span>
                  </div>
                  {b.status === "pending" && (
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => updateBooking(b.id, "confirmed")} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                        Confirm
                      </button>
                      <button onClick={() => updateBooking(b.id, "cancelled")} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
