import React, { useEffect, useState } from "react";
import { vehicleService } from "../services/vehicleService";
import { driversService } from "../services/driversService";
import { multaService } from "../services/multaService";
import { incidenteService } from "../services/incidenteService";

const Home = () => {
  const [totalVehiculos, setTotalVehiculos] = useState(null);
  const [totalPropietarios, setTotalPropietarios] = useState(null);
  const [totalMultas, setTotalMultas] = useState(null);
  const [totalIncidencias, setTotalIncidencias] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotals = async () => {
      setLoading(true);
      try {
        const vehiculos = await vehicleService.getAll();
        setTotalVehiculos(Array.isArray(vehiculos) ? vehiculos.length : 0);

        const propietarios = await driversService.getAll();
        setTotalPropietarios(Array.isArray(propietarios) ? propietarios.length : 0);

        const multas = await multaService.getAll();
        setTotalMultas(Array.isArray(multas) ? multas.length : 0);

        const incidencias = await incidenteService.getAll();
        setTotalIncidencias(Array.isArray(incidencias) ? incidencias.length : 0);
      } catch {
        setTotalVehiculos(0);
        setTotalPropietarios(0);
        setTotalMultas(0);
        setTotalIncidencias(0);
      } finally {
        setLoading(false);
      }
    };
    fetchTotals();
  }, []);

  return (
    <div className="flex flex-col w-full max-w-[960px] flex-1 px-4 py-3">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#1b0e0e] tracking-light text-[32px] font-bold leading-tight">Inicio</p>
          <p className="text-[#994d4d] text-sm font-normal leading-normal">Resumen general</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 px-4 py-3">
        <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#e7d0d0] p-3 items-center text-center">
          {loading ? (
            <span className="animate-pulse text-[#1b0e0e] text-2xl font-bold">...</span>
          ) : (
            <p className="text-[#1b0e0e] tracking-light text-2xl font-bold leading-tight">
              {totalVehiculos}
            </p>
          )}
          <div className="flex items-center gap-2">
            <p className="text-[#994d4d] text-sm font-normal leading-normal">Total de Vehículos</p>
          </div>
        </div>

        <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#e7d0d0] p-3 items-center text-center">
          {loading ? (
            <span className="animate-pulse text-[#1b0e0e] text-2xl font-bold">...</span>
          ) : (
            <p className="text-[#1b0e0e] tracking-light text-2xl font-bold leading-tight">
              {totalPropietarios}
            </p>
          )}
          <div className="flex items-center gap-2">
            <p className="text-[#994d4d] text-sm font-normal leading-normal">Total de Propietarios</p>
          </div>
        </div>

        <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#e7d0d0] p-3 items-center text-center">
          {loading ? (
            <span className="animate-pulse text-[#1b0e0e] text-2xl font-bold">...</span>
          ) : (
            <p className="text-[#1b0e0e] tracking-light text-2xl font-bold leading-tight">
              {totalMultas}
            </p>
          )}
          <div className="flex items-center gap-2">
            <p className="text-[#994d4d] text-sm font-normal leading-normal">Total de Multas</p>
          </div>
        </div>

        <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#e7d0d0] p-3 items-center text-center">
          {loading ? (
            <span className="animate-pulse text-[#1b0e0e] text-2xl font-bold">...</span>
          ) : (
            <p className="text-[#1b0e0e] tracking-light text-2xl font-bold leading-tight">
              {totalIncidencias}
            </p>
          )}
          <div className="flex items-center gap-2">
            <p className="text-[#994d4d] text-sm font-normal leading-normal">Total de Incidencias</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
