import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "./LogoutButton";

const navByRole = {
  Admin: [
    { to: "/admin", label: "Overview" },
    { to: "/admin", label: "Users" },
    { to: "/admin", label: "Therapists" },
    { to: "/admin", label: "Sessions" },
  ],
  Therapist: [
    { to: "/therapist", label: "Overview" },
    { to: "/therapist", label: "Availability" },
    { to: "/therapist", label: "Bookings" },
  ],
  Client: [
    { to: "/client", label: "Overview" },
    { to: "/client", label: "My Sessions" },
    { to: "/client", label: "Book" },
  ],
};

export default function DashboardLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const role = user?.role || 'client';
  const links = navByRole[role] || [];
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-slate-800">MindCare</h2>
          <p className="text-sm text-gray-500 mt-1">{role} Panel</p>
        </div>
        <nav className="p-4 space-y-1">
          {links.map((l, i) => (
            <NavLink
              to={l.to}
              key={i}
              className={({ isActive }) => `block px-4 py-2 rounded-md text-sm ${isActive ? "bg-slate-100 font-medium" : "hover:bg-slate-50"}`}
            >
              {l.label}
            </NavLink>
          ))}
          <div className="mt-4 px-4 text-xs text-gray-400">v1.0</div>
        </nav>
      </aside>

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 bg-white border-b z-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <button className="md:hidden px-2 py-1 rounded bg-slate-100 text-sm">Menu</button>
              <h1 className="text-lg font-semibold">{role} Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-sm text-gray-600">Notifications</button>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="text-sm text-right">
                    <div className="font-medium">{user?.name || 'User'}</div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </div>
                  <img src="https://i.pravatar.cc/40" alt="avatar" className="w-9 h-9 rounded-full" />
                </div>
                <LogoutButton />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}