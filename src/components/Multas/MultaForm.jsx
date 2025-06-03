import React, { useState, useEffect } from "react";
import Select from "react-select";
import { vehicleService } from "../../services/vehicleService";
import { FaDollarSign } from "react-icons/fa";
import { tipoMultaOptions } from "../../utils/multaTypes";

const tipoMultaLabels = tipoMultaOptions.reduce((acc, opt) => {
  acc[opt.value] = opt.label;
  return acc;
}, {});

const MultaForm = ({ onSave, initialData }) => {
  const [form, setForm] = useState({
    vehiculo: null,
    tipoMulta: "",
    monto: "",
    fecha: "",
    descripcion: "",
  });
  const [vehiculos, setVehiculos] = useState([]);
  const [submitting, setSubmitting] = useState(false);

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
        idMulta: initialData.idMulta,
        vehiculo: initialData.vehiculo,
        tipoMulta: initialData.tipoMulta,
        monto: initialData.monto,
        fecha: initialData.fecha,
        descripcion: initialData.descripcion || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVehiculoChange = (selectedOption) => {
    setForm({
      ...form,
      vehiculo: selectedOption ? selectedOption.value : null,
    });
  };

  const handleTipoMultaChange = (e) => {
    setForm({ ...form, tipoMulta: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log("Datos del formulario:", form);
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
        {isEdit ? "Actualizar Multa" : "Registrar Multa"}
      </h2>

      {/* Vehículo */}
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
          className="rounded-lg focus:ring-2 focus:ring-[#f3e7e7]"
          required
        />
      </div>

      {/* Tipo de multa */}
      <div>
        <label className="block text-sm font-medium mb-1 text-[#1b0e0e]">
          Tipo de multa
        </label>
        <select
          name="tipoMulta"
          value={form.tipoMulta}
          onChange={handleTipoMultaChange}
          className="w-full pl-3 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f3e7e7]"
          required
        >
          <option value="">Selecciona un tipo de multa</option>
          {tipoMultaOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium mb-1 text-[#1b0e0e]">
          Descripción
        </label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          className="w-full pl-3 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f3e7e7]"
          placeholder="Describe la multa"
          required
        />
      </div>

      {/* Monto con ícono */}
      <div>
        <label className="block text-sm font-medium text-[#1b0e0e] mb-1">
          Monto
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
            <FaDollarSign />
          </span>
          <input
            type="number"
            name="monto"
            value={form.monto}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f3e7e7]"
            placeholder="Ingrese monto"
            required
          />
        </div>
      </div>

      {/* Fecha */}
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
        />
      </div>

      {/* Botón */}
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

export { tipoMultaLabels };
export default MultaForm;
