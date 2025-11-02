import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load stored user from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing stored user:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData, token) => {
    const finalUser = {
      ...userData,
      role: userData.role || "client", // fallback to client
    };
    setUser(finalUser);
    localStorage.setItem("user", JSON.stringify(finalUser));
    if (token) localStorage.setItem("token", token);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Update user data
  const updateUser = (newUserData) => {
    setUser((prev) => {
      const updated = { ...prev, ...newUserData };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  // Update role dynamically
  const setRole = (newRole) => {
    setUser((prev) => {
      const updated = { ...prev, role: newRole };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  const value = { user, login, logout, updateUser, setRole, loading };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
      </div>
    );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
