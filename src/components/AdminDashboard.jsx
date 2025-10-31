import React, { useState } from "react";

function AdminDashboard() {
  const [users, setUsers] = useState([
    { id: 1, name: "John i john i", email: "you@example.com", role: "client" },
    { id: 2, name: "Dr. dr", email: "me@example.com", role: "therapist" },
  ]);

  const [sessions, setSessions] = useState([
    { id: 1, client: "John knee", therapist: "Dr. daktari", date: "2024-01-15", status: "completed" },
  ]);

  const addUser = () => {
    const id = Date.now();
    setUsers([{ id, name: `New User ${id % 1000}`, email: `user${id % 1000}@x.com`, role: "client" }, ...users]);
  };

  const remove = (setter) => (id) => setter((prev) => prev.filter((i) => i.id !== id));
  const removeUser = remove(setUsers);
  const removeSession = remove(setSessions);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/assets/background.png')" }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white text-center">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card label="Total Users" value={users.length} />
          <Card label="Therapists" value={users.filter((u) => u.role === "therapist").length} />
          <Card label="Sessions" value={sessions.length} />
        </div>

        {/* Users table */}
        <div className="bg-white/20 backdrop-blur-md border rounded-lg shadow-sm overflow-hidden text-white">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="font-semibold">Users</h2>
            <button onClick={addUser} className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">
              Add User
            </button>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-white/10 text-xs uppercase text-gray-200">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t hover:bg-white/20">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        u.role === "therapist" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <button onClick={() => alert(`Edit ${u.name}`)} className="text-indigo-600 mr-3">
                      Edit
                    </button>
                    <button onClick={() => removeUser(u.id)} className="text-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Card({ label, value }) {
  return (
    <div className="bg-white/20 backdrop-blur-md border rounded-lg p-4 shadow-sm text-white">
      <div className="text-sm text-gray-200">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}

export default AdminDashboard;
