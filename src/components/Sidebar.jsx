import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const links = [
    { path: "/dashboard/admin", label: "Admin", icon: <Users size={18} /> },
    { path: "/dashboard/therapist", label: "Therapist", icon: <UserCog size={18} /> },
    { path: "/dashboard/client", label: "Client", icon: <CalendarCheck size={18} /> },
  ];

  return (
    <div className="w-64 bg-white shadow-md border-r flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">MindCare</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-blue-50"
              }`
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>

      <button className="flex items-center gap-2 p-4 text-red-600 hover:bg-red-50">
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
}

export default Sidebar;