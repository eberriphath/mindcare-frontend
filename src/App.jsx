import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route for "/" */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
