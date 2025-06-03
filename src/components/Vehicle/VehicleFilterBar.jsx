import React, { useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import Swal from "sweetalert2"; 

const VehicleFilterBar = ({ initialFilters, onApply, onCancel }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("placa");
  const [filterMultas, setFilterMultas] = useState(
    initialFilters.filterMultas || ""
  );
  const [filterRobado, setFilterRobado] = useState(
    initialFilters.filterRobado || ""
  );
  const [showFilters, setShowFilters] = useState(false);

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilterMultas("");   // <-- Limpia el filtro de multas
    setFilterRobado("");   // <-- Limpia el filtro de robado
    onApply({
      searchType,
      searchTerm: "",
      filterMultas: "",
      filterRobado: "",
    });
  };

  const handleClear = () => {
    setFilterMultas("");
    setFilterRobado("");
  };

  // Cambia aquí: muestra un alert si no hay resultados
  const handleApply = async () => {
    const result = await onApply({
      searchType,
      searchTerm,
      filterMultas,
      filterRobado,
    });
    setShowFilters(false);

    // Si el padre retorna un array vacío, muestra el alert
    if (Array.isArray(result) && result.length === 0) {
      Swal.fire(
        "Sin resultados",
        "No se encontraron vehículos para esa búsqueda.",
        "info"
      );
    }
  };

  const handleCancel = () => {
    onCancel();
    setShowFilters(false);
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setSearchTerm(""); // Limpia el input al cambiar el tipo de búsqueda
  };

  return (
    <div className="relative flex flex-wrap md:flex-nowrap items-center gap-2 w-full">
      {/* Toggle de tipo de búsqueda */}
      <div className="flex gap-2">
        <button
          onClick={() => handleSearchTypeChange("placa")}
          className={`px-3 py-1 rounded border ${
            searchType === "placa"
              ? "bg-[#4C0022] text-white"
              : "border-gray-400 text-gray-700 hover:bg-gray-100"
          }`}
        >
          Buscar por placa
        </button>
        <button
          onClick={() => handleSearchTypeChange("propietario")}
          className={`px-3 py-1 rounded border ${
            searchType === "propietario"
              ? "bg-[#4C0022] text-white"
              : "border-gray-400 text-gray-700 hover:bg-gray-100"
          }`}
        >
          Buscar por propietario
        </button>
      </div>

      {/* Input de búsqueda adaptativo */}
      <div className="flex flex-col w-full md:w-auto flex-grow">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={
              searchType === "placa" ? "Ej. ABC1234" : "CURP del propietario"
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded p-2 w-full"
          />
          {/* Botón de filtro */}
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="bg-gray-300 hover:bg-gray-400 p-2 rounded"
            title="Mostrar/Ocultar filtros"
          >
            <FaFilter className="text-gray-700" />
          </button>
          {/* Botón de búsqueda */}
          <button
            className="bg-[#4C0022] text-white p-2 rounded hover:bg-[#6a0040]"
            onClick={handleApply}
            title="Buscar"
          >
            <FaSearch />
          </button>
          {/* Botón de limpiar búsqueda */}
          <button
            className="bg-gray-300 text-[#4C0022] p-2 rounded hover:bg-gray-400 transition-colors"
            onClick={handleClearSearch}
            title="Limpiar búsqueda"
          >
            <FiX />
          </button>
        </div>
      </div>

      {/* Panel de filtros */}
      {showFilters && (
        <div className="absolute top-full right-0 mt-2 bg-white border rounded shadow-lg p-4 w-80 z-10">
          <div className="mb-4">
            <label className="block mb-1 font-semibold">¿Tiene multas?</label>
            <select
              value={filterMultas}
              onChange={(e) => setFilterMultas(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="">Selecciona una opción</option>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">¿Es robado?</label>
            <select
              value={filterRobado}
              onChange={(e) => setFilterRobado(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="">Selecciona una opción</option>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1 rounded border border-gray-400 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              onClick={handleClear}
              className="px-3 py-1 rounded border border-red-500 text-red-500 hover:bg-red-50"
            >
              Limpiar
            </button>
            <button
              onClick={handleApply}
              className="px-3 py-1 rounded bg-[#4C0022] text-white hover:bg-[#6a0040]"
            >
              Aplicar filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleFilterBar;
