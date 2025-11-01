import React, { useState, useEffect } from "react";
import { mockTherapistProfile, mockTherapistAvailability, mockTherapistBookings } from "../mockData";

const useMock = true;

export default function TherapistDashboard() {
  const [profile, setProfile] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState({});

  useEffect(() => {
    if (useMock) {
      setProfile(mockTherapistProfile);
      setTempProfile(mockTherapistProfile);
      setAvailability(mockTherapistAvailability);
      setBookings(mockTherapistBookings);
      setLoading(false);
    }
  }, []);

  const handleChange = (e) =>
    setTempProfile({ ...tempProfile, [e.target.name]: e.target.value });

  const handleSave = () => {
    setProfile(tempProfile);
    setEditMode(false);
  };

  const handleAddAvailability = () => {
    const newSlot = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      time: "09:00 AM - 05:00 PM",
    };
    setAvailability((prev) => [newSlot, ...prev]);
  };

  const handleCancelBooking = (id) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: "cancelled" } : b
      )
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-gray-800">
      {/* Tabs */}
      <div className="flex justify-center gap-3">
        {["profile", "availability", "bookings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === tab
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-green-100"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
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
                className="w-full p-2 border rounded"
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={tempProfile.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Email"
              />
              <input
                type="text"
                name="specialization"
                value={tempProfile.specialization}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Specialization"
              />
              <button
                onClick={handleSave}
                className="bg-blue-500 px-4 py-2 rounded text-white mt-2"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <p><b>Name:</b> {profile.name}</p>
              <p><b>Email:</b> {profile.email}</p>
              <p><b>Specialization:</b> {profile.specialization}</p>
              <p><b>Experience:</b> {profile.experience} years</p>
            </div>
          )}
        </div>
      )}

      {/* Availability Tab */}
      {activeTab === "availability" && (
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
          <h2 className="text-2xl font-semibold mb-2">Availability</h2>
          <button
            onClick={handleAddAvailability}
            className="bg-green-500 px-4 py-2 rounded text-white mb-3"
          >
            Add Availability
          </button>

          {availability.length === 0 ? (
            <p className="text-gray-500">No available slots yet.</p>
          ) : (
            availability.map((slot) => (
              <div
                key={slot.id}
                className="p-3 border border-gray-200 rounded-lg flex justify-between"
              >
                <span>
                  <b>Date:</b> {slot.date} • <b>Time:</b> {slot.time}
                </span>
                <span className="text-green-600 font-medium">Available</span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === "bookings" && (
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
          <h2 className="text-2xl font-semibold mb-2">Bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-500">No bookings yet.</p>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="flex justify-between p-3 border border-gray-200 rounded-lg items-center"
              >
                <div>
                  <p><b>Client:</b> {b.client}</p>
                  <p>
                    <b>Date:</b> {b.date} • <b>Time:</b> {b.time}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      b.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : b.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {b.status}
                  </span>
                  {b.status === "pending" && (
                    <button
                      onClick={() => handleCancelBooking(b.id)}
                      className="px-2 py-1 text-xs bg-red-500 rounded text-white hover:bg-red-600"
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
    </div>
  );
}
