import React, { useState } from "react";

export default function TherapistDashboard(){
  const [availability, setAvailability] = useState([
    { id:1, date:"2024-01-20", time:"09:00", available:true },
    { id:2, date:"2024-01-20", time:"10:00", available:false }
  ]);
  const [bookings, setBookings] = useState([
    { id:1, client:"John Doe", date:"2024-01-20", time:"10:00", status:"pending" }
  ]);

  const toggle = id => setAvailability(prev=> prev.map(p=> p.id===id?{...p,available:!p.available}:p));
  const updateBooking = (id, status) => setBookings(prev=> prev.map(b=> b.id===id?{...b,status}:b));
  const addSlot = ()=> setAvailability(prev=> [{id:Date.now(), date:"2024-02-01", time:"11:00", available:true},...prev]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Availability & Bookings</h2>
        <button onClick={addSlot} className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">Add Slot</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="font-medium mb-3">Availability</h3>
          <div className="space-y-2">
            {availability.map(a=>(
              <div key={a.id} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <div className="font-medium">{a.date}</div>
                  <div className="text-sm text-gray-500">{a.time}</div>
                </div>
                <button onClick={()=>toggle(a.id)} className={`px-3 py-1 rounded text-sm ${a.available? "bg-green-100 text-green-800":"bg-red-100 text-red-800"}`}>
                  {a.available? "Available":"Unavailable"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="font-medium mb-3">Bookings</h3>
          <div className="space-y-3">
            {bookings.map(b=>(
              <div key={b.id} className="border rounded p-3">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">{b.client}</div>
                    <div className="text-sm text-gray-500">{b.date} • {b.time}</div>
                  </div>
                  <div className="text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${b.status==="confirmed"?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800"}`}>{b.status}</span>
                  </div>
                </div>
                {b.status === "pending" && (
                  <div className="mt-3 flex gap-2">
                    <button onClick={()=>updateBooking(b.id,"confirmed")} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Confirm</button>
                    <button onClick={()=>updateBooking(b.id,"cancelled")} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Cancel</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}