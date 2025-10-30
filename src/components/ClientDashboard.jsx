import React, { useState, useEffect } from "react";
import { mockClientProfile, mockClientSessions } from "../mockData";

const API_URL = "http://127.0.0.1:5000";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col fixed h-full p-6">
      <h2 className="text-2xl font-bold mb-8">MindCare</h2>
      <nav className="flex flex-col gap-4">
        <a href="#" className="hover:text-green-400">Dashboard</a>
        <a href="#" className="hover:text-green-400">Profile</a>
        <a href="#" className="hover:text-green-400">Sessions</a>
        <a href="#" className="hover:text-green-400">Logout</a>
      </nav>
    </div>
  );
}

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

  const saveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/client/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });
      if (!res.ok) throw new Error();
      setEditOpen(false);
    } catch { alert("Error updating profile"); }
    finally { setLoading(false); }
  };

  const bookSession = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { therapist, date, time } = e.target;
    try {
      const res = await fetch(`${API_URL}/client/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ therapist: therapist.value, date: date.value, time: time.value })
      });
      if (!res.ok) throw new Error();
      const newSession = await res.json();
      setSessions([newSession, ...sessions]);
      setBookingOpen(false);
    } catch { alert("Error booking session"); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 ml-64 relative">
        <div className="flex gap-6">
          <div className="bg-white rounded-2xl p-6 shadow w-72">
            <h3 className="font-semibold text-lg mb-2">Profile</h3>
            <p className="font-bold">{profile.name}</p>
            <p className="text-sm">{profile.email}</p>
            <p className="text-sm">{profile.phone}</p>
            <p className="text-sm">{profile.gender}</p>
            <button onClick={() => setEditOpen(true)} className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg">Edit Profile</button>
          </div>

          <div className="flex-1 bg-white rounded-2xl p-6 shadow">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold text-lg">My Sessions</h3>
              <button onClick={() => setBookingOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded-lg">Book Session</button>
            </div>
            <div className="space-y-3">
              {sessions.map(s => (
                <div key={s.id} className="border rounded-lg p-3 flex justify-between">
                  <div>
                    <div className="font-medium">{s.therapist}</div>
                    <div className="text-sm text-gray-500">{s.date} • {s.time}</div>
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 text-xs rounded ${s.status==="scheduled" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>{s.status}</div>
                    {s.status==="scheduled" && <button className="mt-2 text-xs text-green-500" onClick={()=>alert("Joining session...")}>Join</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {editOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <form onSubmit={saveProfile} className="bg-white rounded-2xl p-6 w-80 space-y-4">
              <h4 className="font-semibold text-lg">Edit Profile</h4>
              <input placeholder="Full Name" value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})} className="w-full p-2 border rounded"/>
              <select value={profile.gender} onChange={e=>setProfile({...profile,gender:e.target.value})} className="w-full p-2 border rounded">
                <option value="">Select Gender</option><option>Male</option><option>Female</option>
              </select>
              <input placeholder="Email" value={profile.email} onChange={e=>setProfile({...profile,email:e.target.value})} className="w-full p-2 border rounded"/>
              <input placeholder="Phone" value={profile.phone} onChange={e=>setProfile({...profile,phone:e.target.value})} className="w-full p-2 border rounded"/>
              <div className="flex gap-2">
                <button type="submit" disabled={loading} className="flex-1 bg-green-500 text-white py-2 rounded">Save</button>
                <button type="button" onClick={()=>setEditOpen(false)} className="flex-1 bg-gray-300 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {bookingOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <form onSubmit={bookSession} className="bg-white rounded-2xl p-6 w-80 space-y-4">
              <h4 className="font-semibold text-lg">Book Session</h4>
              <input name="therapist" placeholder="Therapist Name" className="w-full p-2 border rounded" required/>
              <input name="date" type="date" className="w-full p-2 border rounded" required/>
              <input name="time" type="time" className="w-full p-2 border rounded" required/>
              <div className="flex gap-2">
                <button type="submit" disabled={loading} className="flex-1 bg-green-500 text-white py-2 rounded">Confirm</button>
                <button type="button" onClick={()=>setBookingOpen(false)} className="flex-1 bg-gray-300 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
