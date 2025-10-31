import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ import your auth context

function MoodTracker() {
  const { user } = useAuth(); // ✅ get logged-in user
  const [entries, setEntries] = useState([]);
  const [mood, setMood] = useState("😊");
  const [journal, setJournal] = useState("");
  const [editingId, setEditingId] = useState(null);

  const apiUrl = "/api/mood";

  const fetchEntries = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`${apiUrl}/user/${user.id}`);
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error("Failed to fetch entries:", err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [user]);

  const saveEntry = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${apiUrl}/${editingId}` : apiUrl;
      const body = JSON.stringify({
        user_id: user.id, // ✅ include the user ID
        mood,
        journal,
      });

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });

      setMood("😊");
      setJournal("");
      setEditingId(null);
      fetchEntries();
    } catch (err) {
      console.error("Failed to save entry:", err);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      fetchEntries();
    } catch (err) {
      console.error("Failed to delete entry:", err);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={saveEntry} className="flex flex-col gap-2">
        <div>
          <label>Mood: </label>
          <select value={mood} onChange={(e) => setMood(e.target.value)}>
            <option>😊</option>
            <option>😢</option>
            <option>😡</option>
            <option>😐</option>
            <option>😱</option>
          </select>
        </div>
        <textarea
          placeholder="Write your journal..."
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          className="border rounded p-2 text-black"
          required
        />
        <button className="bg-green-500 text-white py-2 rounded">
          {editingId ? "Update" : "Add"} Entry
        </button>
      </form>

      {entries.map((entry) => (
        <div
          key={entry.id}
          className="border rounded p-3 flex justify-between items-start"
        >
          <div>
            <div className="text-xl">{entry.mood}</div>
            <div className="text-gray-700">{entry.journal}</div>
            <div className="text-sm text-gray-400">
              {new Date(entry.date).toLocaleString()}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => {
                setEditingId(entry.id);
                setMood(entry.mood);
                setJournal(entry.journal);
              }}
              className="text-blue-500 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => deleteEntry(entry.id)}
              className="text-red-500 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default  MoodTracker;
