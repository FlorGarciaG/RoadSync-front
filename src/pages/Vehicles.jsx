import React, { useState, useEffect } from "react";
import VehicleCard from "../components/Vehicle/VehicleCard";
import VehicleForm from "../components/Vehicle/VehicleForm";
import VehicleFilterBar from "../components/Vehicle/VehicleFilterBar";
import { FiPlus, FiMinus } from "react-icons/fi";
import { driversService } from "../services/driversService";
import { vehicleService } from "../services/vehicleService";
import { multaService } from "../services/multaService";
import { incidenteService } from "../services/incidenteService";
import Swal from "sweetalert2";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({
    propietarioCurp: "",
    tipo: "",
    placa: "",
    marca: "",
    modelo: "",
    tarjeta: "",
    tarjetaVencimiento: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [renderForm, setRenderForm] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [filters, setFilters] = useState({
    searchType: "placa", // "placa" o "propietario"
    searchTerm: "",
  });
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [multas, setMultas] = useState([]);
  const [incidencias, setIncidencias] = useState([]);

  // Cargar vehículos
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const data = await vehicleService.getAll();
        setVehicles(data);
        setFilteredVehicles(data);
      } catch {
        setVehicles([]);
        setFilteredVehicles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  // Cargar conductores
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const data = await driversService.getAll();
        setDrivers(data);
      } catch {
        setDrivers([]);
      }
    };
    fetchDrivers();
  }, []);

  // Cargar multas
  useEffect(() => {
    const fetchMultas = async () => {
      try {
        const data = await multaService.getAll();
        setMultas(Array.isArray(data) ? data : []);
      } catch {
        setMultas([]);
      }
    };
    fetchMultas();
  }, []);

  // Cargar incidencias
  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const data = await incidenteService.getAll();
        setIncidencias(Array.isArray(data) ? data : []);
      } catch {
        setIncidencias([]);
      }
    };
    fetchIncidencias();
  }, []);

  useEffect(() => {
    if (showForm) {
      setRenderForm(true);
    } else {
      const timeout = setTimeout(() => setRenderForm(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [showForm]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      propietario: { curp: formData.propietarioCurp },
      tipo: formData.tipo,
      placa: formData.placa,
      marca: formData.marca,
      modelo: formData.modelo,
      tarjeta: formData.tarjeta,
      tarjetaVencimiento: formData.tarjetaVencimiento,
    };

    try {
      if (editIndex !== null) {
        const id = vehicles[editIndex].idVehiculo;
        const response = await vehicleService.update(id, dataToSend);
        Swal.fire(
          "Éxito",
          response?.message || "Vehículo actualizado",
          "success"
        );
      } else {
        const response = await vehicleService.create(dataToSend);
        Swal.fire(
          "Éxito",
          response?.message || "Vehículo registrado",
          "success"
        );
      }
      const updated = await vehicleService.getAll();
      setVehicles(updated);
      setFilteredVehicles(updated);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Error al guardar vehículo";
      Swal.fire("Error", msg, "error");
    }

    setFormData({
      propietarioCurp: "",
      tipo: "",
      placa: "",
      marca: "",
      modelo: "",
      tarjeta: "",
      tarjetaVencimiento: "",
    });
    setEditIndex(null);
    setShowForm(false);
  };

  const handleClearForm = () => {
    setFormData({
      propietarioCurp: "",
      tipo: "",
      placa: "",
      marca: "",
      modelo: "",
      tarjeta: "",
      tarjetaVencimiento: "",
    });
    setEditIndex(null);
  };

  const openEdit = (index) => {
    const item = filteredVehicles[index];
    setFormData({
      propietarioCurp: item.propietario?.curp || "",
      tipo: item.tipo || "",
      placa: item.placa || "",
      marca: item.marca || "",
      modelo: item.modelo || "",
      tarjeta: item.tarjeta || "",
      tarjetaVencimiento: item.tarjetaVencimiento || "",
    });
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = async (index) => {
    const id = filteredVehicles[index].idVehiculo;

    // Verifica si tiene multas o incidencias asociadas
    const tieneMultas = multas.some(m => m.vehiculo?.idVehiculo === id);
    const tieneIncidencias = incidencias.some(i => i.vehiculo?.idVehiculo === id);

    if (tieneMultas || tieneIncidencias) {
      Swal.fire(
        "No se puede eliminar",
        "Este vehículo tiene multas o incidencias asociadas y no puede ser eliminado.",
        "warning"
      );
      return;
    }

    const result = await Swal.fire({
      title: "¿Seguro que deseas eliminar este vehículo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4C0022",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await vehicleService.delete(id);
        const updated = await vehicleService.getAll();
        setVehicles(updated);
        setFilteredVehicles(updated);
        Swal.fire("Eliminado", "Vehículo eliminado con éxito", "success");
      } catch (error) {
        Swal.fire(
          "Error",
          error.response?.data?.message ||
            error.response?.data ||
            error.message ||
            "Error al eliminar vehículo",
          "error"
        );
      }
    }
  };

  // Búsqueda solo por placa o propietario (CURP)
  const handleApplyFilters = async (newFilters) => {
    setFilters(newFilters);

    // Si no hay búsqueda, muestra todos
    if ((!newFilters.searchTerm || !newFilters.searchType) && !newFilters.filterMultas && !newFilters.filterRobado) {
      setFilteredVehicles(vehicles);
      return vehicles;
    }

    setLoading(true);
    try {
      let cleanData = vehicles;

      // Filtro por placa o propietario
      if (newFilters.searchTerm && newFilters.searchType) {
        if (newFilters.searchType === "placa") {
          cleanData = cleanData.filter(v =>
            v.placa?.toLowerCase().includes(newFilters.searchTerm.trim().toLowerCase())
          );
        } else if (newFilters.searchType === "propietario") {
          cleanData = cleanData.filter(v =>
            v.propietario?.curp?.toLowerCase().includes(newFilters.searchTerm.trim().toLowerCase())
          );
        }
      }

      // Filtro por multas
      if (newFilters.filterMultas === "true") {
        cleanData = cleanData.filter(v =>
          multas.some(m => m.vehiculo?.idVehiculo === v.idVehiculo)
        );
      } else if (newFilters.filterMultas === "false") {
        cleanData = cleanData.filter(v =>
          !multas.some(m => m.vehiculo?.idVehiculo === v.idVehiculo)
        );
      }

      // Filtro por incidencias (robado)
      if (newFilters.filterRobado === "true") {
        cleanData = cleanData.filter(v =>
          incidencias.some(i => i.vehiculo?.idVehiculo === v.idVehiculo)
        );
      } else if (newFilters.filterRobado === "false") {
        cleanData = cleanData.filter(v =>
          !incidencias.some(i => i.vehiculo?.idVehiculo === v.idVehiculo)
        );
      }

      setFilteredVehicles(cleanData);
      return cleanData;
    } catch (error) {
      setFilteredVehicles([]);
      Swal.fire("Error", error.message || "No se encontraron resultados", "error");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleCancelFilters = () => {
    setFilters({
      searchType: "placa",
      searchTerm: "",
    });
    setFilteredVehicles(vehicles);
  };

  // Si cambia la lista de vehículos y no hay búsqueda activa, actualiza la lista filtrada
  useEffect(() => {
    if (!filters.searchTerm) {
      setFilteredVehicles(vehicles);
    }
  }, [vehicles]);

  return (
    <div className="p-4 bg-[#fcf8f8] min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-[#4C0022]">
        Gestión de Vehículos
      </h1>

      {/* Contenedor de botón y filtro */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        {/* Botón agregar vehículo */}
        <button
          className="flex items-center gap-2 bg-[#4C0022] text-white px-4 py-2 rounded hover:bg-[#6a0040] transition-colors self-start md:self-auto"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? (
            <>
              <FiMinus className="transition-transform duration-300" />
              Ocultar formulario
            </>
          ) : (
            <>
              <FiPlus className="transition-transform duration-300" />
              Agregar vehículo
            </>
          )}
        </button>

        {/* Barra de filtros */}
        <div className="flex-grow">
          <VehicleFilterBar
            initialFilters={filters}
            onApply={handleApplyFilters}
            onCancel={handleCancelFilters}
          />
        </div>
      </div>

      {/* Formulario con transición */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          showForm
            ? "max-h-[1000px] opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        }`}
      >
        {renderForm && (
          <VehicleForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            drivers={drivers}
            editMode={editIndex !== null}
            onClear={handleClearForm}
          />
        )}
      </div>

      {/* Lista de vehículos */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredVehicles.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-8">
              No se encontraron resultados.
            </div>
          ) : (
            filteredVehicles.map((v, i) => (
              <VehicleCard
                key={v.idVehiculo || i}
                vehicle={v}
                multas={multas.filter(m => m.vehiculo?.idVehiculo === v.idVehiculo)}
                incidencias={incidencias.filter(inc => inc.vehiculo?.idVehiculo === v.idVehiculo)}
                onEdit={() => openEdit(i)}
                onDelete={() => handleDelete(i)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Vehicles;
