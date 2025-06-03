import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import MultaForm from "../../components/Multas/MultaForm";
import MultaCard from "../../components/Multas/MultaCard";
import { multaService } from "../../services/multaService";
import Swal from "sweetalert2";
import { FiPlus, FiSearch, FiX } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

const MultasPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [multas, setMultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMulta, setEditMulta] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const placa = searchParams.get("placa");

  const fetchMultas = async () => {
    setLoading(true);
    try {
      if (placa) {
        const data = await multaService.findByPlaca(placa);
        setMultas(Array.isArray(data) ? data : []);
      } else {
        const data = await multaService.getAll();
        setMultas(Array.isArray(data) ? data : []);
      }
    } catch {
      setMultas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMultas();
  }, [placa]);

  const handleAddMulta = async (nuevaMulta) => {
    console.log("Nueva multa a agregar:", nuevaMulta);
    try {
      await multaService.create({
        vehiculo: { idVehiculo: nuevaMulta.vehiculo.idVehiculo },
        tipoMulta: nuevaMulta.tipoMulta,
        monto: nuevaMulta.monto,
        fecha: nuevaMulta.fecha,
        descripcion: nuevaMulta.descripcion,
      });
      Swal.fire("Éxito", "Multa registrada correctamente", "success");
      const data = await multaService.getAll();
      setMultas(Array.isArray(data) ? data : []);
      setShowModal(false);
    } catch (error) {
      Swal.fire(
        "Error",
        error.message || "No se pudo registrar la multa",
        "error"
      );
    }
  };

  const handleUpdateMulta = async (multaEditada) => {
    try {
      await multaService.update(multaEditada.idMulta, {
        vehiculo: { idVehiculo: multaEditada.vehiculo.idVehiculo },
        tipoMulta: multaEditada.tipoMulta,
        monto: multaEditada.monto,
        fecha: multaEditada.fecha,
        descripcion: multaEditada.descripcion,
      });
      Swal.fire("Éxito", "Multa actualizada correctamente", "success");
      const data = await multaService.getAll();
      setMultas(Array.isArray(data) ? data : []);
      setShowModal(false);
      setEditMulta(null);
    } catch (error) {
      Swal.fire(
        "Error",
        error.message || "No se pudo actualizar la multa",
        "error"
      );
    }
  };

  const handleDeleteMulta = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar multa?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#4C0022",
    });
    if (result.isConfirmed) {
      try {
        await multaService.delete(id);
        Swal.fire("Eliminada", "Multa eliminada correctamente", "success");
        setMultas((prev) => prev.filter((m) => m.idMulta !== id));
      } catch (error) {
        Swal.fire(
          "Error",
          error.message || "No se pudo eliminar la multa",
          "error"
        );
      }
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchMultas(); // recarga todas si está vacío
      return;
    }
    setLoading(true);
    try {
      const data = await multaService.findByPlaca(searchTerm.trim());
      setMultas(Array.isArray(data) ? data : []);
      if (!data || data.length === 0) {
        Swal.fire("Sin resultados", "No se encontraron multas para esa placa", "info");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "No se pudo buscar multas", "error");
      setMultas([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    // Elimina el parámetro 'placa' de la URL
    searchParams.delete("placa");
    setSearchParams(searchParams);
    fetchMultas();
  };

  return (
    <div className="p-6 bg-[#fcf8f8] min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-[#4C0022]">Gestión de Multas</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            setEditMulta(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-[#4C0022] text-white px-4 py-2 rounded hover:bg-[#6a0040] transition-colors"
        >
          <FiPlus className="transition-transform duration-300" />
          Agregar multa
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

      {/* Spinner de carga estilo Drivers */}
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
          {multas.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-8">
              No hay multas registradas.
            </div>
          ) : (
            multas.map((multa) => (
              <MultaCard
                key={multa.idMulta}
                vehiculo={multa.vehiculo}
                tipoMulta={multa.tipoMulta}
                descripcion={multa.descripcion}
                monto={multa.monto}
                fecha={multa.fecha}
                onDelete={() => handleDeleteMulta(multa.idMulta)}
                onEdit={() => {
                  setEditMulta(multa);
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
          setEditMulta(null);
        }}
      >
        <MultaForm
          onSave={editMulta ? handleUpdateMulta : handleAddMulta}
          initialData={editMulta}
        />
      </Modal>
    </div>
  );
};

export default MultasPage;
