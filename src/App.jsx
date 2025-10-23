import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import AdminDashboard from "./components/AdminDashboard";
import TherapistDashboard from "./components/TherapistDashboard";
import ClientDashboard from "./components/ClientDashboard";
import  DashboardLayout from "./components/DashboardLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/therapist" element={<TherapistDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/dashboard" element={<DashboardLayout />} >
        </Route>
      </Routes>
    </Router>
  );
}

export default App;