import React, { useState, useEffect } from "react";
import Select from "react-select";
import { vehicleService } from "../../services/vehicleService";
import { tipoIncidenciaOptions } from "../../utils/incidenciaTypes";

const IncidenteForm = ({ onSave, initialData }) => {
  const [form, setForm] = useState({
    vehiculo: null,
    tipoIncidencia: "",
    descripcion: "",
    fecha: "",
  });
  const [vehiculos, setVehiculos] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [fechaError, setFechaError] = useState("");

  // Cálculo de fechas límite
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const maxDate = `${yyyy}-${mm}-${dd}`;
  const minDate = `${yyyy - 10}-${mm}-${dd}`;

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const data = await vehicleService.getAll();
        setVehiculos(Array.isArray(data) ? data : []);
      } catch {
        setVehiculos([]);
      }
    };
    fetchVehiculos();
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm({
        idIncidencia: initialData.idIncidencia,
        vehiculo: initialData.vehiculo,
        tipoIncidencia: initialData.tipoIncidencia,
        descripcion: initialData.descripcion,
        fecha: initialData.fecha,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fecha") {
      if (value > maxDate) {
        setFechaError("El valor debe ser igual o inferior a la fecha actual");
      } else if (value < minDate) {
        setFechaError("El valor debe ser igual o superior a hace 10 años");
      } else {
        setFechaError("");
      }
    }
    setForm({ ...form, [name]: value });
  };

  const handleVehiculoChange = (selectedOption) => {
    setForm({
      ...form,
      vehiculo: selectedOption ? selectedOption.value : null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await onSave(form);
    setSubmitting(false);
  };

  const vehiculoOptions = vehiculos.map((v) => ({
    value: v,
    label: `${v.placa} - ${v.marca} ${v.modelo}`,
  }));

  const isEdit = Boolean(initialData);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-[#4C0022]">
        {isEdit ? "Actualizar Incidencia" : "Registrar Incidencia"}
      </h2>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#1b0e0e]">
          Vehículo
        </label>
        <Select
          options={vehiculoOptions}
          onChange={handleVehiculoChange}
          value={
            vehiculoOptions.find(
              (opt) => opt.value.placa === form.vehiculo?.placa
            ) || null
          }
          placeholder="Selecciona o escribe la placa"
          isClearable
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#1b0e0e]">
          Tipo de incidencia
        </label>
        <select
          name="tipoIncidencia"
          id="tipo_incidencia"
          value={form.tipoIncidencia}
          onChange={handleChange}
          required
          className="w-full pl-3 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f3e7e7] bg-white text-[#1b0e0e]"
        >
          <option value="">Selecciona un tipo de incidencia</option>
          {tipoIncidenciaOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#1b0e0e]">
          Descripción
        </label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          className="w-full pl-3 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f3e7e7]"
          placeholder="Describe la incidencia"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#1b0e0e]">
          Fecha
        </label>
        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          className="w-full pl-3 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f3e7e7]"
          required
          min={minDate}
          max={maxDate}
        />
        {fechaError && (
          <p className="text-red-600 text-xs mt-1">{fechaError}</p>
        )}
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="bg-[#4C0022] text-white px-4 py-2 rounded hover:bg-[#3a001a]"
          disabled={submitting}
        >
          {submitting
            ? isEdit
              ? "Actualizando..."
              : "Guardando..."
            : isEdit
            ? "Actualizar"
            : "Guardar"}
        </button>
      </div>
    </form>
  );
};

export default IncidenteForm;
