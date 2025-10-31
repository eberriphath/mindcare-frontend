import React, { useState, useEffect } from "react";
import { mockClientProfile, mockClientSessions } from "../mockData";

const API_URL = "http://127.0.0.1:5000";

export default function ClientDashboard() {
  const [profile, setProfile] = useState(mockClientProfile);
  const [sessions, setSessions] = useState(mockClientSessions);
  const [editOpen, setEditOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [p, s] = await Promise.all([
          fetch(`${API_URL}/client/profile`).then(r => r.json()),
          fetch(`${API_URL}/client/sessions`).then(r => r.json())
        ]);
        setProfile(p);
        setSessions(s);
      } catch (e) { console.error(e); }
    })();
  }, []);

  const saveProfile = async (e) => { e.preventDefault(); /* ... */ };
  const bookSession = async (e) => { e.preventDefault(); /* ... */ };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Client Dashboard</h1>
      {/* Profile + sessions cards */}
      {/* Modals for editing profile and booking session */}
    </div>
  );
}

