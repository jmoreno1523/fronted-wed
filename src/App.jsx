import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";

export default function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Gestión de Usuarios</h2>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/usuarios">Usuarios</Link>
        </nav>
      </aside>

      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </main>
    </div>
  );
}
