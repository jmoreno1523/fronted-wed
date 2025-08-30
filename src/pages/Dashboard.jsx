import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://backend-venta.vercel.app/api/dashboard")
      .then((r) => r.json())
      .then((d) => {
        setStats(d.stats || d);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudo cargar el dashboard");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="card error">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Dashboard</h1>

      {/* MÉTRICAS PRINCIPALES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card p-4 shadow-md bg-white rounded-xl">
          <h4 className="text-gray-600">Usuarios</h4>
          <p className="text-2xl font-bold">{stats.usuarios}</p>
        </div>
        <div className="card p-4 shadow-md bg-white rounded-xl">
          <h4 className="text-gray-600">Ventas</h4>
          <p className="text-2xl font-bold">{stats.ventas}</p>
        </div>
        <div className="card p-4 shadow-md bg-white rounded-xl">
          <h4 className="text-gray-600">Ingresos</h4>
          <p className="text-2xl font-bold">${stats.ingresos}</p>
        </div>
        <div className="card p-4 shadow-md bg-white rounded-xl">
          <h4 className="text-gray-600">Ticket Promedio</h4>
          <p className="text-2xl font-bold">
            {stats.ventas > 0
              ? `$${(stats.ingresos / stats.ventas).toFixed(2)}`
              : "—"}
          </p>
        </div>
      </div>

      {/* GRÁFICAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Ventas por usuario */}
        <div className="card p-4 shadow-md bg-white rounded-xl">
          <h4 className="mb-4 font-semibold">Ventas por usuario</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.ventasPorUsuario}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="usuario" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ventas" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Ingresos en el tiempo */}
        <div className="card p-4 shadow-md bg-white rounded-xl">
          <h4 className="mb-4 font-semibold">Ingresos en el tiempo</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats.ingresosPorMes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ingresos" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLA DE ÚLTIMAS VENTAS */}
      <div className="card p-4 shadow-md bg-white rounded-xl mb-6">
        <h4 className="mb-4 font-semibold">Últimas ventas</h4>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">🎮 Juego</th>
              <th className="p-3">💲 Precio</th>
              <th className="p-3">📅 Fecha</th>
            </tr>
          </thead>
          <tbody>
            {stats.ultimasVentas?.map((v, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{v.juego}</td>
                <td className="p-3">${v.precio}</td>
                <td className="p-3">
                  {new Date(v.fecha).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TABLA DE ÚLTIMOS PRODUCTOS */}
      <div className="card p-4 shadow-md bg-white rounded-xl">
        <h4 className="mb-4 font-semibold">Últimos productos</h4>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">📦 Producto</th>
              <th className="p-3">💲 Precio</th>
              <th className="p-3">📅 Fecha</th>
            </tr>
          </thead>
          <tbody>
            {stats.productos?.map((p, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{p.nombre}</td>
                <td className="p-3">${p.precio}</td>
                <td className="p-3">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
