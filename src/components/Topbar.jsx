import React from "react";

function Topbar() {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 border-b">
      <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          className="rounded-full w-10 h-10 border"
        />
        <span className="font-medium text-gray-700">Dr. Naomi</span>
      </div>
    </header>
  );
}

export default Topbar;