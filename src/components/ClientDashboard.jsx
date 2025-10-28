import React, { useState } from "react";

function ClientDashboard(){
  const [profile,setProfile] = useState({ name:"John Doe", email:"john@example.com", phone:"+1 555 123" });
  const [sessions,setSessions] = useState([
    { id:1, therapist:"Dr. Smith", date:"2024-01-15", time:"10:00", status:"completed" },
    { id:2, therapist:"Dr. Lee", date:"2024-02-05", time:"09:00", status:"scheduled" }
  ]);
  const [bookingOpen,setBookingOpen] = useState(false);

  const book = (e) => {
    e.preventDefault();
    const id = Date.now();
    setSessions(prev=> [{id, therapist:"Dr. New", date:"2024-03-01", time:"11:00", status:"scheduled"}, ...prev]);
    setBookingOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-6 items-start">
        <div className="bg-white border rounded-lg p-4 shadow-sm w-72">
          <h3 className="font-medium">Profile</h3>
          <p className="mt-2 text-sm"><b>{profile.name}</b></p>
          <p className="text-xs text-gray-500">{profile.email}</p>
          <p className="text-xs text-gray-500">{profile.phone}</p>
          <button className="mt-4 w-full bg-indigo-600 text-white py-1 rounded" onClick={()=>alert("Edit profile")}>Edit</button>
        </div>

        <div className="flex-1 bg-white border rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">My Sessions</h3>
            <div>
              <button onClick={()=>setBookingOpen(true)} className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">Book Session</button>
            </div>
          </div>
          <div className="space-y-3">
            {sessions.map(s=>(
              <div key={s.id} className="border rounded p-3 flex justify-between items-start">
                <div>
                  <div className="font-medium">{s.therapist}</div>
                  <div className="text-xs text-gray-500">{s.date} • {s.time}</div>
                </div>
                <div className="text-right">
                  <div className={`px-2 py-1 text-xs rounded ${s.status==="scheduled"?"bg-yellow-100 text-yellow-800":"bg-green-100 text-green-800"}`}>{s.status}</div>
                  {s.status==="scheduled" && <button onClick={()=>alert("Join session")} className="mt-2 text-xs text-indigo-600">Join</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {bookingOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <form onSubmit={book} className="bg-white rounded-lg p-6 w-80">
            <h4 className="font-semibold mb-3">Book Session</h4>
            <label className="text-xs text-gray-600">Therapist</label>
            <input className="w-full border p-2 rounded mb-2 text-sm" defaultValue="Dr. New" required />
            <label className="text-xs text-gray-600">Date</label>
            <input type="date" className="w-full border p-2 rounded mb-3 text-sm" required />
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded">Confirm</button>
              <button type="button" onClick={()=>setBookingOpen(false)} className="flex-1 bg-gray-200 rounded">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}


export default ClientDashboard;