import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  mockAdminProfile,
  mockTherapistList,
  mockClientList,
  mockReports,
} from "../mockData";

const useMock = true;

export default function AdminDashboard() {
  const navigate = useNavigate();
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

  const logout = () => {
    localStorage.clear();
    navigate("/portal");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-emerald-900 text-white">
        <div className="border-4 border-emerald-400 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-700 text-white flex flex-col items-center py-10 px-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-2">Admin Dashboard 🛡️</h1>
        <p className="text-center text-gray-200 mb-8">
          Welcome back,{" "}
          <span className="font-semibold text-emerald-300">{profile.name}</span>.
        </p>

        <div className="flex justify-center gap-4 mb-6">
          {["overview", "therapists", "clients", "reports", "settings"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg font-medium tracking-wide transition-all ${
                  activeTab === tab
                    ? "bg-emerald-300 text-emerald-900 font-semibold"
                    : "bg-emerald-800 hover:bg-emerald-700 text-white/90"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>

        {activeTab === "overview" && (
          <div className="bg-emerald-800/50 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 border-b border-emerald-400 pb-2">
              Overview
            </h2>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="bg-emerald-700/70 p-4 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-emerald-200">
                  {therapists.length}
                </h3>
                <p className="text-gray-200">Therapists</p>
              </div>
              <div className="bg-emerald-700/70 p-4 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-emerald-200">
                  {clients.length}
                </h3>
                <p className="text-gray-200">Clients</p>
              </div>
              <div className="bg-emerald-700/70 p-4 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-emerald-200">
                  {reports.length}
                </h3>
                <p className="text-gray-200">Reports</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "therapists" && (
          <div className="bg-emerald-800/50 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 border-b border-emerald-400 pb-2">
              Therapist Management
            </h2>
            {therapists.length === 0 ? (
              <p className="text-gray-300">No therapists available.</p>
            ) : (
              <div className="space-y-3">
                {therapists.map((t) => (
                  <div
                    key={t.id}
                    className="flex justify-between items-center bg-emerald-700/70 p-4 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-emerald-100">
                        {t.name} — {t.specialization}
                      </p>
                      <p className="text-sm text-gray-300">{t.email}</p>
                    </div>
                    <span
                      className={`px-3 py-1 text-sm rounded-lg font-medium ${
                        t.active
                          ? "bg-green-200 text-green-900"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {t.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "clients" && (
          <div className="bg-emerald-800/50 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 border-b border-emerald-400 pb-2">
              Client Management
            </h2>
            {clients.length === 0 ? (
              <p className="text-gray-300">No clients registered yet.</p>
            ) : (
              <div className="space-y-3">
                {clients.map((c) => (
                  <div
                    key={c.id}
                    className="flex justify-between items-center bg-emerald-700/70 p-4 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-emerald-100">
                        {c.name} — {c.gender}
                      </p>
                      <p className="text-sm text-gray-300">{c.email}</p>
                    </div>
                    <span className="px-3 py-1 text-sm rounded-lg bg-emerald-300 text-emerald-900 font-medium">
                      {c.sessions} sessions
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "reports" && (
          <div className="bg-emerald-800/50 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 border-b border-emerald-400 pb-2">
              Reports
            </h2>
            {reports.length === 0 ? (
              <p className="text-gray-300">No reports found.</p>
            ) : (
              <div className="space-y-3">
                {reports.map((r) => (
                  <div
                    key={r.id}
                    className="bg-emerald-700/70 p-4 rounded-lg space-y-1"
                  >
                    <p>
                      <span className="font-semibold text-emerald-300">
                        Reporter:
                      </span>{" "}
                      {r.reporter}
                    </p>
                    <p>
                      <span className="font-semibold text-emerald-300">
                        Issue:
                      </span>{" "}
                      {r.issue}
                    </p>
                    <p className="text-sm text-gray-300">Date: {r.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-emerald-800/50 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 border-b border-emerald-400 pb-2">
              Admin Settings
            </h2>
            <ul className="space-y-2 text-gray-100">
              <li>
                <span className="font-semibold text-emerald-300">Email:</span>{" "}
                {profile.email}
              </li>
              <li>
                <span className="font-semibold text-emerald-300">Role:</span>{" "}
                {profile.role}
              </li>
            </ul>
            <div className="flex justify-center mt-6">
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold text-white shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
