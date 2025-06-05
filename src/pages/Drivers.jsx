import React, { useState, useEffect } from "react";
import DriverForm from "../components/Drivers/DriverForm";
import DriverTable from "../components/Drivers/DriverTable";
import { driversService } from "../services/driversService";
import { vehicleService } from "../services/vehicleService";
import { FiPlus, FiMinus, FiSearch } from "react-icons/fi";
import Swal from "sweetalert2";

const RFC_GENERICO = "XAXX010101000";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    curp: "",
    rfc: "",
    licencia: "",
    licenciaVencimiento: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [renderForm, setRenderForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [homoclave, setHomoclave] = useState("");
  const [useGenericRfc, setUseGenericRfc] = useState(false);

  // Mostrar/ocultar el formulario con animación
  useEffect(() => {
    if (showForm) {
      setRenderForm(true);
    } else {
      const timeout = setTimeout(() => setRenderForm(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [showForm]);

  useEffect(() => {
    cargarDrivers();
  }, []);

  const cargarDrivers = async () => {
    setLoading(true);
    try {
      const data = await driversService.getAll();
      setDrivers(data);
    } catch (error) {
      Swal.fire("Error", "Error al cargar propietarios", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (dataToSend) => {
    // Validar que la CURP esté presente
    if (!dataToSend.curp || dataToSend.curp.trim() === "") {
      Swal.fire("Campo requerido", "La CURP es obligatoria", "warning");
      return;
    }

    try {
      let response;
      if (editIndex !== null) {
        response = await driversService.update(formData.curp, dataToSend);
      } else {
        response = await driversService.create(dataToSend);
      }

      if (typeof response === "string") {
        Swal.fire("Éxito", response, "success");
      } else if (response?.message) {
        Swal.fire("Éxito", response.message, "success");
      } else {
        Swal.fire(
          "Éxito",
          editIndex !== null
            ? "Propietario actualizado"
            : "Propietario registrado",
          "success"
        );
      }

      setFormData({
        nombre: "",
        apellidos: "",
        curp: "",
        rfc: "",
        licencia: "",
        licenciaVencimiento: "",
      });
      setEditIndex(null);
      cargarDrivers();
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Error al guardar propietario";
      Swal.fire("Error", msg, "error");
    }
  };

  const handleEdit = (index) => {
    const driver = drivers[index];
    setEditIndex(index);

    // Detecta si es RFC genérico
    const isGeneric = driver.rfc === RFC_GENERICO;
    setUseGenericRfc(isGeneric);

    // Si no es genérico, separa la homoclave (últimos 3 caracteres)
    let homoclaveValue = "";
    if (!isGeneric && driver.rfc && driver.rfc.length === 13) {
      homoclaveValue = driver.rfc.substring(10, 13);
    }
    setHomoclave(homoclaveValue);

    setFormData({
      nombre: driver.nombre || "",
      apellidos: driver.apellidos || "",
      curp: driver.curp || "",
      rfc: driver.rfc || "",
      licencia: driver.licencia || "",
      licenciaVencimiento: driver.licenciaVencimiento || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (index) => {
    const curp = drivers[index].curp;

    // Verifica si el propietario tiene vehículos asignados
    try {
      const vehiculos = await vehicleService.findByPropietarioCurp(curp);
      if (vehiculos && vehiculos.length > 0) {
        Swal.fire(
          "No se puede eliminar",
          "Este propietario tiene vehículos asignados y no puede ser eliminado.",
          "warning"
        );
        return;
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "No se pudo verificar si el propietario tiene vehículos asignados.",
        "error"
      );
      return;
    }

    const result = await Swal.fire({
      title: "¿Seguro que deseas eliminar este propietario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4C0022",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        await driversService.delete(curp);
        cargarDrivers();
        Swal.fire("Eliminado", "Propietario eliminado con éxito", "success");
      } catch (error) {
        Swal.fire("Error", "Error al eliminar propietario", "error");
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      cargarDrivers();
      return;
    }
    setLoading(true);
    try {
      const result = await driversService.getByCurp(searchTerm.trim());
      setDrivers(result ? [result] : []);
    } catch (error) {
      Swal.fire(
        "Sin resultados",
        "No se encontró propietario con esa CURP",
        "info"
      );
      setDrivers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    setFormData({
      nombre: "",
      apellidos: "",
      curp: "",
      rfc: "",
      licencia: "",
      licenciaVencimiento: "",
    });
    setEditIndex(null);
  };

  return (
    <div className="p-4 bg-[#fcf8f8] min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-[#4C0022]">
        Gestión de Propietarios
      </h1>
      <div className="flex justify-between items-center mb-4">
        <button
          className="flex items-center gap-2 bg-[#4C0022] text-white px-4 py-2 rounded hover:bg-[#6a0040] transition-colors"
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
              Agregar propietario
            </>
          )}
        </button>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar por CURP"
            className="w-72 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#4C0022] text-sm"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button
            className="bg-[#4C0022] text-white p-2 rounded hover:bg-[#6a0040] transition-colors"
            onClick={handleSearch}
          >
            <FiSearch />
          </button>
        </div>
      </div>
      {/* Spinner de carga */}
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
        <>
          <div
            className={`transition-all duration-500 overflow-hidden ${
              showForm
                ? "max-h-[1000px] opacity-100 scale-100"
                : "max-h-0 opacity-0 scale-95"
            }`}
          >
            {renderForm && (
              <DriverForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                editMode={editIndex !== null}
                onClear={handleClearForm}
                homoclave={homoclave}
                setHomoclave={setHomoclave}
                useGenericRfc={useGenericRfc}
                setUseGenericRfc={setUseGenericRfc}
              />
            )}
          </div>
          <DriverTable
            drivers={drivers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default Drivers;
