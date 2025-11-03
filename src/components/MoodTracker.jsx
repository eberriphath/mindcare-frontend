import React, { useState, useEffect } from "react";

export default function MoodTrackerMock() {
  const [entries, setEntries] = useState([]);
  const [mood, setMood] = useState("😊");
  const [journal, setJournal] = useState("");
  const [editingId, setEditingId] = useState(null);

  // 🧪 Mock initial data
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        mood: "😊",
        journal: "Had a great morning!",
        date: new Date().toISOString(),
      },
      {
        id: 2,
        mood: "😢",
        journal: "Feeling a bit down today.",
        date: new Date().toISOString(),
      },
    ];
    setEntries(mockData);
  }, []);

  // 💾 Save or update mood entry
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === editingId
            ? { ...entry, mood, journal, date: new Date().toISOString() }
            : entry
        )
      );
      setEditingId(null);
    } else {
      const newEntry = {
        id: entries.length ? entries[entries.length - 1].id + 1 : 1,
        mood,
        journal,
        date: new Date().toISOString(),
      };
      setEntries((prev) => [...prev, newEntry]);
    }
    setMood("😊");
    setJournal("");
  };

  // ❌ Delete entry
  const deleteEntry = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/10 p-6 rounded-2xl text-white shadow-lg space-y-6">
      <h1 className="text-3xl font-semibold text-center mb-4">🌤️ Mood Tracker</h1>

      {/* 📝 Add/Edit Form */}
      <form onSubmit={handleSubmit} className="bg-white/10 p-4 rounded-xl space-y-3">
        <div className="flex items-center gap-3">
          <label className="text-lg font-medium">Mood:</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="text-black px-2 py-1 rounded"
          >
            <option>😊</option>
            <option>😢</option>
            <option>😡</option>
            <option>😐</option>
            <option>😱</option>
          </select>
        </div>

        <textarea
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          placeholder="Write a few words about your day..."
          required
          className="w-full rounded-md p-2 text-black min-h-[80px]"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 py-2 rounded-md font-semibold"
        >
          {editingId ? "Update Mood" : "Add Mood"}
        </button>
      </form>

      {/* 📋 Mood List */}
      <div className="space-y-3">
        {entries.length === 0 ? (
          <p className="text-center text-gray-300">
            No mood entries yet. Start journaling 🌱
          </p>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-start"
            >
              <div>
                <div className="text-2xl">{entry.mood}</div>
                <p className="text-gray-200">{entry.journal}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(entry.date).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <button
                  onClick={() => {
                    setEditingId(entry.id);
                    setMood(entry.mood);
                    setJournal(entry.journal);
                  }}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
