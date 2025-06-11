import React, { useEffect, useState, useCallback } from "react";
import { vehicleService } from "../services/vehicleService";
import { driversService } from "../services/driversService";
import { multaService } from "../services/multaService";
import { incidenteService } from "../services/incidenteService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { tipoMultaLabels } from "../utils/multaTypes";
import { tipoIncidenciaLabels } from "../utils/incidenciaTypes";
import { FaRegSmile } from "react-icons/fa";

const CACHE_KEY = "homeDashboard";
const CACHE_TIME_KEY = "homeDashboardTime";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

const Home = () => {
  const [totalVehiculos, setTotalVehiculos] = useState(null);
  const [totalPropietarios, setTotalPropietarios] = useState(null);
  const [totalMultas, setTotalMultas] = useState(null);
  const [totalIncidencias, setTotalIncidencias] = useState(null);
  const [multasPorTipo, setMultasPorTipo] = useState([]);
  const [incidenciasPorTipo, setIncidenciasPorTipo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  // Función para contar y mostrar el label descriptivo
  const contarPorTipo = (items, labels, key) => {
    const conteo = {};
    items.forEach((item) => {
      const tipo = item[key] || "Sin tipo";
      conteo[tipo] = (conteo[tipo] || 0) + 1;
    });
    return Object.entries(conteo).map(([name, value]) => ({
      name: labels[name] || name,
      value,
    }));
  };

  // Memoriza la función para poder llamarla desde el botón
  const fetchTotals = useCallback(async (force = false) => {
    setLoading(true);
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
      const now = Date.now();

      if (!force && cached && cacheTime && now - cacheTime < CACHE_DURATION) {
        const data = JSON.parse(cached);
        setTotalVehiculos(data.totalVehiculos);
        setTotalPropietarios(data.totalPropietarios);
        setTotalMultas(data.totalMultas);
        setTotalIncidencias(data.totalIncidencias);
        setMultasPorTipo(data.multasPorTipo);
        setIncidenciasPorTipo(data.incidenciasPorTipo);
        setLoading(false);
        return;
      }

      const vehiculos = await vehicleService.getAll();
      const propietarios = await driversService.getAll();
      const multas = await multaService.getAll();
      const incidencias = await incidenteService.getAll();

      const data = {
        totalVehiculos: Array.isArray(vehiculos) ? vehiculos.length : 0,
        totalPropietarios: Array.isArray(propietarios) ? propietarios.length : 0,
        totalMultas: Array.isArray(multas) ? multas.length : 0,
        totalIncidencias: Array.isArray(incidencias) ? incidencias.length : 0,
        multasPorTipo: contarPorTipo(Array.isArray(multas) ? multas : [], tipoMultaLabels, "tipoMulta"),
        incidenciasPorTipo: contarPorTipo(Array.isArray(incidencias) ? incidencias : [], tipoIncidenciaLabels, "tipoIncidencia"),
      };

      setTotalVehiculos(data.totalVehiculos);
      setTotalPropietarios(data.totalPropietarios);
      setTotalMultas(data.totalMultas);
      setTotalIncidencias(data.totalIncidencias);
      setMultasPorTipo(data.multasPorTipo);
      setIncidenciasPorTipo(data.incidenciasPorTipo);

      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_TIME_KEY, now.toString());
    } catch (error) {
      // console.error("Error en fetchTotals:", error);
      setTotalVehiculos(0);
      setTotalPropietarios(0);
      setTotalMultas(0);
      setTotalIncidencias(0);
      setMultasPorTipo([]);
      setIncidenciasPorTipo([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTotals();
  }, [fetchTotals]);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.nombre || "");
      setUserRole(user.rol || "");
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <svg
          className="animate-spin h-10 w-10 text-[#4C0022] mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
        <span className="text-[#4C0022] text-lg font-semibold">
          Cargando resumen...
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-[960px] flex-1 px-4 py-3 relative">
      {/* Chip de rol en la esquina superior derecha */}
      {userRole && (
        <span className="absolute top-4 right-4 bg-[#4C0022] text-white px-4 py-1 rounded-full text-sm shadow font-semibold z-10 m-3">
          {userRole}
        </span>
      )}
      <div className="flex items-center gap-4 bg-[#f3e7e7] rounded-xl p-4 mb-6 shadow">
        <div className="flex items-center justify-center bg-[#4C0022] rounded-full h-12 w-12">
          <FaRegSmile className="text-white text-2xl" />
        </div>
        <div>
          <p className="text-xl font-bold text-[#4C0022] mb-1">
            ¡Bienvenido{userName ? `, ${userName}` : ""}!
          </p>
          <p className="text-[#994d4d] text-sm">
            Resumen general de vehículos, propietarios, multas e incidencias.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-3 p-4">
        <button
          onClick={() => fetchTotals(true)}
          className="bg-[#4C0022] text-white px-4 py-2 rounded hover:bg-[#6a0040] transition-colors h-fit"
        >
          Actualizar datos
        </button>
      </div>

      <div className="flex flex-wrap gap-3 px-4 py-3">
        {[
          { label: "Total de Vehículos", total: totalVehiculos },
          { label: "Total de Propietarios", total: totalPropietarios },
          { label: "Total de Multas", total: totalMultas },
          { label: "Total de Incidencias", total: totalIncidencias },
        ].map((item, index) => (
          <div
            key={index}
            className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#e7d0d0] p-3 items-center text-center"
          >
            {loading ? (
              <span className="animate-pulse text-[#1b0e0e] text-2xl font-bold">
                ...
              </span>
            ) : (
              <p className="text-[#1b0e0e] tracking-light text-2xl font-bold leading-tight">
                {item.total}
              </p>
            )}
            <div className="flex items-center gap-2">
              <p className="text-[#994d4d] text-sm font-normal leading-normal">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Gráfica de Multas por Tipo */}
      {!loading && multasPorTipo.length > 0 && (
        <div className="w-full h-80 mt-8">
          <p className="text-[#4C0022] text-xl font-bold mb-2">
            Multas por Tipo
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={multasPorTipo}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#B23A48" name="Cantidad de Multas" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Gráfica de Incidencias por Tipo */}
      {!loading && incidenciasPorTipo.length > 0 && (
        <div className="w-full h-80 mt-8">
          <p className="text-[#4C0022] text-xl font-bold mb-2">
            Incidencias por Tipo
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={incidenciasPorTipo}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3A506B" name="Cantidad de Incidencias" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Home;
