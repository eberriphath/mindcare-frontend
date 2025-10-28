import React, { useState } from "react";

export default function AdminDashboard(){
  const [users, setUsers] = useState([
    { id:1, name:"John Doe", email:"john@example.com", role:"client" },
    { id:2, name:"Dr. Smith", email:"smith@example.com", role:"therapist" }
  ]);
  const [sessions, setSessions] = useState([
    { id:1, client:"John Doe", therapist:"Dr. Smith", date:"2024-01-15", status:"completed" }
  ]);

  const addUser = () => {
    const id = Date.now();
    setUsers([{ id, name:`New User ${id%1000}`, email:`user${id%1000}@x.com`, role:"client" }, ...users]);
  };
  const remove = (setter) => (id) => setter(prev => prev.filter(i => i.id !== id));
  const removeUser = remove(setUsers);
  const removeSession = remove(setSessions);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card label="Total Users" value={users.length} />
        <Card label="Therapists" value={users.filter(u=>u.role==="therapist").length} />
        <Card label="Sessions" value={sessions.length} />
      </div>

      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="font-semibold">Users</h2>
          <div className="flex items-center gap-2">
            <button onClick={addUser} className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">Add User</button>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Email</th><th className="p-3">Role</th><th className="p-3">Actions</th></tr>
          </thead>
          <tbody>
            {users.map(u=>(
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3"><span className={`px-2 py-1 text-xs rounded ${u.role==="therapist" ? "bg-green-100 text-green-800":"bg-blue-100 text-blue-800"}`}>{u.role}</span></td>
                <td className="p-3">
                  <button onClick={()=>alert(`Edit ${u.name}`)} className="text-indigo-600 mr-3">Edit</button>
                  <button onClick={()=>removeUser(u.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b flex justify-between items-center">
          <h2 className="font-semibold">Sessions</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr><th className="p-3">Client</th><th className="p-3">Therapist</th><th className="p-3">Date</th><th className="p-3">Status</th><th className="p-3">Actions</th></tr>
          </thead>
          <tbody>
            {sessions.map(s=>(
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{s.client}</td>
                <td className="p-3">{s.therapist}</td>
                <td className="p-3">{s.date}</td>
                <td className="p-3"><span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">{s.status}</span></td>
                <td className="p-3">
                  <button onClick={()=>alert(`Edit session ${s.id}`)} className="text-indigo-600 mr-3">Edit</button>
                  <button onClick={()=>removeSession(s.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({label,value}) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}