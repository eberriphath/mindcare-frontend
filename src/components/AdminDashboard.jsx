import React, { useState, useEffect } from "react";
import {
  mockAdminProfile,
  mockTherapistList,
  mockClientList,
  mockReports,
} from "../mockData";

const useMock = true;

export default function AdminDashboard() {
  const [profile, setProfile] = useState(null);
  const [therapists, setTherapists] = useState([]);
  const [clients, setClients] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (useMock) {
      setProfile(mockAdminProfile);
      setTherapists(mockTherapistList);
      setClients(mockClientList);
      setReports(mockReports);
      setLoading(false);
    }
  }, []);

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
        {["overview", "therapists", "clients", "reports", "settings"].map(
          (tab) => (
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
          )
        )}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-3">
          <h2 className="text-2xl font-semibold mb-2">Admin Overview</h2>
          <p>
            Welcome back, <b>{profile.name}</b> 👋
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="p-4 border rounded-xl text-center bg-green-50">
              <h3 className="text-2xl font-bold text-green-600">
                {therapists.length}
              </h3>
              <p>Therapists Registered</p>
            </div>
            <div className="p-4 border rounded-xl text-center bg-blue-50">
              <h3 className="text-2xl font-bold text-blue-600">
                {clients.length}
              </h3>
              <p>Clients Registered</p>
            </div>
            <div className="p-4 border rounded-xl text-center bg-yellow-50">
              <h3 className="text-2xl font-bold text-yellow-600">
                {reports.length}
              </h3>
              <p>Reports Logged</p>
            </div>
          </div>
        </div>
      )}

      {/* Therapists Tab */}
      {activeTab === "therapists" && (
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
          <h2 className="text-2xl font-semibold">Therapist Management</h2>
          {therapists.length === 0 ? (
            <p className="text-gray-500">No therapists available.</p>
          ) : (
            therapists.map((t) => (
              <div
                key={t.id}
                className="flex justify-between p-3 border border-gray-200 rounded-lg items-center"
              >
                <div>
                  <p>
                    <b>{t.name}</b> — {t.specialization}
                  </p>
                  <p className="text-sm text-gray-500">{t.email}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    t.active
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {t.active ? "Active" : "Inactive"}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Clients Tab */}
      {activeTab === "clients" && (
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
          <h2 className="text-2xl font-semibold">Client Management</h2>
          {clients.length === 0 ? (
            <p className="text-gray-500">No clients registered yet.</p>
          ) : (
            clients.map((c) => (
              <div
                key={c.id}
                className="flex justify-between p-3 border border-gray-200 rounded-lg items-center"
              >
                <div>
                  <p>
                    <b>{c.name}</b> — {c.gender}
                  </p>
                  <p className="text-sm text-gray-500">{c.email}</p>
                </div>
                <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
                  {c.sessions} sessions
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === "reports" && (
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
          <h2 className="text-2xl font-semibold">Reports</h2>
          {reports.length === 0 ? (
            <p className="text-gray-500">No reports found.</p>
          ) : (
            reports.map((r) => (
              <div
                key={r.id}
                className="border border-gray-200 rounded-lg p-3 space-y-1"
              >
                <p>
                  <b>Reporter:</b> {r.reporter}
                </p>
                <p>
                  <b>Issue:</b> {r.issue}
                </p>
                <p className="text-sm text-gray-500">
                  Date: {r.date}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
          <h2 className="text-2xl font-semibold">Admin Settings</h2>
          <p>
            Email: <b>{profile.email}</b>
          </p>
          <p>Role: <b>{profile.role}</b></p>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
