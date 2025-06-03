import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const VehicleCard = ({ vehicle, multas = [], incidencias = [], onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleChipClick = (type) => {
    if (type === "multas") {
      navigate(`/problemas-legales/multas?placa=${vehicle.placa}`);
    } else if (type === "incidencias") {
      navigate(`/problemas-legales/incidencias?placa=${vehicle.placa}`);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl border-2 border-[#4C0022] p-6 w-full max-w-md relative transition-transform hover:scale-[1.02]">
      {/* Header: Placa y botones */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-2xl font-bold text-[#4C0022] tracking-wide">
          {vehicle.placa}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(vehicle)}
            className="text-[#4C0022] hover:text-[#6a0040] transition-colors"
            title="Editar"
          >
            <FiEdit size={20} />
          </button>
          <button
            onClick={() => onDelete(vehicle)}
            className="text-red-600 hover:text-red-800 transition-colors"
            title="Eliminar"
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      </div>

      {/* Chips de Multas e Incidencias */}
      <div className="flex gap-2 mb-4">
        {multas.length > 0 && (
          <button
            onClick={() => handleChipClick("multas")}
            className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-semibold hover:bg-red-200 transition-colors"
            title="Ver multas"
          >
            Multas: {multas.length}
          </button>
        )}
        {incidencias.length > 0 && (
          <button
            onClick={() => handleChipClick("incidencias")}
            className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-semibold hover:bg-yellow-200 transition-colors"
            title="Ver incidencias"
          >
            Incidencias: {incidencias.length}
          </button>
        )}
      </div>

      {/* Detalles del vehículo */}
      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-semibold text-[#4C0022]">Tipo:</span>{" "}
          {vehicle.tipo}
        </p>
        <p>
          <span className="font-semibold text-[#4C0022]">Marca:</span>{" "}
          {vehicle.marca}
        </p>
        <p>
          <span className="font-semibold text-[#4C0022]">Modelo:</span>{" "}
          {vehicle.modelo}
        </p>
        <p>
          <span className="font-semibold text-[#4C0022]">Tarjeta:</span>{" "}
          {vehicle.tarjeta}
        </p>
        <p>
          <span className="font-semibold text-[#4C0022]">Vencimiento Tarjeta:</span>{" "}
          {vehicle.tarjetaVencimiento}
        </p>
        <p>
          <span className="font-semibold text-[#4C0022]">Propietario:</span>{" "}
          {vehicle.propietario
            ? `${vehicle.propietario.nombre} ${vehicle.propietario.apellidos} (${vehicle.propietario.curp})`
            : "Sin propietario"}
        </p>
      </div>
    </div>
  );
};

export default VehicleCard;
