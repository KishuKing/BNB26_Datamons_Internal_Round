import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("creatorai_user") || "null")
  );

  const handleAuth = (userData) => {
    localStorage.setItem("creatorai_user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("creatorai_user");
    setUser(null);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Auth onAuth={handleAuth} />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}