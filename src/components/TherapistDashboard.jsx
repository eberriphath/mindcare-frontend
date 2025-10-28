import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { mockClientProfile, mockClientSessions, mockTherapistAvailability, mockTherapistBookings } from "../mockData";


const API_URL = "http://127.0.0.1:5000";

export default function TherapistDashboard() {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    name: "Dr. You",
    email: "youarean@example.com",
    phone: "02833572869",
    gender: "Male",
  });

  const [availability, setAvailability] = useState(mockTherapistAvailability);
  const [bookings, setBookings] = useState(mockTherapistBookings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setAvailability([
          { id: 1, date: "2024-01-20", time: "09:00", available: true },
          { id: 2, date: "2024-01-20", time: "10:00", available: false },
        ]);
        setBookings([
          { id: 1, client: "John Doe", date: "2024-01-20", time: "10:00", status: "pending" },
        ]);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user.id]);

  const toggleAvailability = async (id) => {
    setAvailability((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, available: !slot.available } : slot))
    );
  };

  const updateBooking = async (id, status) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const addSlot = async () => {
    const newSlot = { id: Date.now(), date: "2024-02-01", time: "11:00", available: true };
    setAvailability((prev) => [newSlot, ...prev]);
  };

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start bg-cover bg-center p-6"
      style={{ backgroundImage: `url('/src/assets/background.png')` }}
    >
      <div className="w-full max-w-6xl space-y-6">
        <div className="bg-white/20 backdrop-blur-2xl rounded-2xl shadow-2xl p-6 border border-white/30 w-full">
          <h2 className="text-xl font-semibold text-white mb-4">Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
            <div>
              <p><b>Name:</b> {profile.name}</p>
              <p><b>Email:</b> {profile.email}</p>
            </div>
            <div>
              <p><b>Phone:</b> {profile.phone}</p>
              <p><b>Gender:</b> {profile.gender}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/20 backdrop-blur-2xl rounded-2xl shadow-2xl p-4 border border-white/30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-white">Availability</h3>
              <button
                onClick={addSlot}
                className="px-3 py-1 rounded bg-green-500/80 text-white hover:bg-green-500"
              >
                Add Slot
              </button>
            </div>
            <div className="space-y-2">
              {availability.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between p-3 border rounded border-white/30 text-white"
                >
                  <div>
                    <div>{a.date}</div>
                    <div className="text-sm text-gray-200">{a.time}</div>
                  </div>
                  <button
                    onClick={() => toggleAvailability(a.id)}
                    className={`px-3 py-1 rounded text-sm ${
                      a.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {a.available ? "Available" : "Unavailable"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-2xl rounded-2xl shadow-2xl p-4 border border-white/30">
            <h3 className="font-medium text-white mb-3">Bookings</h3>
            <div className="space-y-3">
              {bookings.map((b) => (
                <div key={b.id} className="border rounded p-3 border-white/30 text-white">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{b.client}</div>
                      <div className="text-sm text-gray-200">{b.date} • {b.time}</div>
                    </div>
                    <div className="text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          b.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                  </div>
                  {b.status === "pending" && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => updateBooking(b.id, "confirmed")}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateBooking(b.id, "cancelled")}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
