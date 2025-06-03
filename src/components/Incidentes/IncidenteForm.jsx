import React, { useState, useEffect } from "react";
import Select from "react-select";
import { vehicleService } from "../../services/vehicleService";

const IncidenteForm = ({ onSave, initialData }) => {
  const [form, setForm] = useState({
    vehiculo: null,
    tipoIncidencia: "",
    descripcion: "",
    fecha: "",
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
        idIncidencia: initialData.idIncidencia,
        vehiculo: initialData.vehiculo,
        tipoIncidencia: initialData.tipoIncidencia,
        descripcion: initialData.descripcion,
        fecha: initialData.fecha,
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
          <option value="robo">Robo</option>
          <option value="simulacion_robo">Simulación de robo</option>
          <option value="mercancia_ilegal">Transporte de mercancía ilegal</option>
          <option value="accidente">Accidente de tránsito</option>
          <option value="clonacion">Clonación de placas</option>
          <option value="secuestro">Secuestro vehicular</option>
          <option value="uso_no_autorizado">Uso no autorizado</option>
          <option value="incidente_legal">Incidente legal</option>
          <option value="uso_en_delito">Vehículo utilizado en delito</option>
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
        />
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