import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import IncidenteForm from "../../components/Incidentes/IncidenteForm";
import IncidenteCard from "../../components/Incidentes/IncidenteCard";
import { incidenteService } from "../../services/incidenteService";
import Swal from "sweetalert2";
import { FiPlus, FiSearch, FiX } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

const IncidenciasPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editIncidente, setEditIncidente] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const placa = searchParams.get("placa");

  const fetchIncidencias = async () => {
    setLoading(true);
    try {
      if (placa) {
        const data = await incidenteService.findByPlaca(placa);
        setIncidencias(Array.isArray(data) ? data : []);
      } else {
        const data = await incidenteService.getAll();
        setIncidencias(Array.isArray(data) ? data : []);
      }
    } catch {
      setIncidencias([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidencias();
  }, [placa]);

  const handleAddIncidente = async (nuevoIncidente) => {
    try {
      await incidenteService.create({
        vehiculo: { idVehiculo: nuevoIncidente.vehiculo.idVehiculo },
        tipoIncidencia: nuevoIncidente.tipoIncidencia,
        descripcion: nuevoIncidente.descripcion,
        fecha: nuevoIncidente.fecha,
      });
      Swal.fire("Éxito", "Incidencia registrada correctamente", "success");
      fetchIncidencias();
      setShowModal(false);
    } catch (error) {
      Swal.fire(
        "Error",
        error.message || "No se pudo registrar la incidencia",
        "error"
      );
    }
  };

  const handleUpdateIncidente = async (incidenteEditado) => {
    try {
      await incidenteService.update(incidenteEditado.idIncidencia, {
        vehiculo: { idVehiculo: incidenteEditado.vehiculo.idVehiculo },
        tipoIncidencia: incidenteEditado.tipoIncidencia,
        descripcion: incidenteEditado.descripcion,
        fecha: incidenteEditado.fecha,
      });
      Swal.fire("Éxito", "Incidencia actualizada correctamente", "success");
      fetchIncidencias();
      setShowModal(false);
      setEditIncidente(null);
    } catch (error) {
      Swal.fire(
        "Error",
        error.message || "No se pudo actualizar la incidencia",
        "error"
      );
    }
  };

  const handleDeleteIncidente = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar incidencia?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#4C0022",
    });
    if (result.isConfirmed) {
      try {
        await incidenteService.delete(id);
        Swal.fire("Eliminada", "Incidencia eliminada correctamente", "success");
        setIncidencias((prev) => prev.filter((i) => i.idIncidencia !== id));
      } catch (error) {
        Swal.fire(
          "Error",
          error.message || "No se pudo eliminar la incidencia",
          "error"
        );
      }
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchIncidencias();
      return;
    }
    setLoading(true);
    try {
      const data = await incidenteService.findByPlaca(searchTerm.trim());
      setIncidencias(Array.isArray(data) ? data : []);
      if (!data || data.length === 0) {
        Swal.fire("Sin resultados", "No se encontraron incidencias para esa placa", "info");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "No se pudo buscar incidencias", "error");
      setIncidencias([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    // Elimina el parámetro 'placa' de la URL
    searchParams.delete("placa");
    setSearchParams(searchParams);
    fetchIncidencias();
  };

  return (
    <div className="p-6 bg-[#fcf8f8] min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-[#4C0022]">Gestión de Incidencias</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            setEditIncidente(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-[#4C0022] text-white px-4 py-2 rounded hover:bg-[#6a0040] transition-colors"
        >
          <FiPlus className="transition-transform duration-300" />
          Agregar incidencia
        </button>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar por placa"
            className="w-72 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#4C0022] text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button
            className="bg-[#4C0022] text-white p-2 rounded hover:bg-[#6a0040] transition-colors"
            onClick={handleSearch}
            title="Buscar"
          >
            <FiSearch />
          </button>
          <button
            className="bg-gray-300 text-[#4C0022] p-2 rounded hover:bg-gray-400 transition-colors"
            onClick={handleClearSearch}
            title="Limpiar búsqueda"
          >
            <FiX />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <svg
            className="animate-spin h-8 w-8 text-[#4C0022]"
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
          <span className="ml-3 text-[#4C0022] font-medium">Cargando...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {incidencias.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-8">
              No hay incidencias registradas.
            </div>
          ) : (
            incidencias.map((incidente) => (
              <IncidenteCard
                key={incidente.idIncidencia}
                vehiculo={incidente.vehiculo}
                tipoIncidencia={incidente.tipoIncidencia}
                descripcion={incidente.descripcion}
                fecha={incidente.fecha}
                onDelete={() => handleDeleteIncidente(incidente.idIncidencia)}
                onEdit={() => {
                  setEditIncidente(incidente);
                  setShowModal(true);
                }}
              />
            ))
          )}
        </div>
      )}

      {/* Modal para agregar/editar */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditIncidente(null);
        }}
      >
        <IncidenteForm
          onSave={editIncidente ? handleUpdateIncidente : handleAddIncidente}
          initialData={editIncidente}
        />
      </Modal>
    </div>
  );
};

export default IncidenciasPage;