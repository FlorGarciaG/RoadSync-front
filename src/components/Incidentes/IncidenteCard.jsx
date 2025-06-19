import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { tipoIncidenciaLabels } from "../../utils/incidenciaTypes";

const IncidenteCard = ({
  vehiculo,
  tipoIncidencia,
  descripcion,
  fecha,
  onDelete,
  onEdit,
  hideActions,
}) => (
  <div className="bg-white shadow-lg rounded-2xl p-4 border border-[#f3e7e7] w-full max-w-sm transition-transform hover:scale-[1.01]">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-bold text-[#4C0022]">
        {vehiculo?.placa || vehiculo?.idVehiculo}
      </h3>
      <span className="bg-[#f3e7e7] text-[#4C0022] text-xs px-2 py-1 rounded-md">
        {fecha}
      </span>
    </div>
    <div className="text-sm text-gray-700 mb-1">
      <strong>Tipo:</strong>{" "}
      {tipoIncidenciaLabels[tipoIncidencia] || tipoIncidencia}
    </div>
    <div className="text-sm text-gray-700 mb-3">
      <strong>Descripción:</strong> {descripcion}
    </div>
    {!hideActions && (
      <div className="flex justify-end gap-2">
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-[#4C0022] hover:text-[#6a0040] text-sm"
        >
          <FaEdit /> Editar
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
        >
          <FaTrash /> Eliminar
        </button>
      </div>
    )}
  </div>
);

export default IncidenteCard;
