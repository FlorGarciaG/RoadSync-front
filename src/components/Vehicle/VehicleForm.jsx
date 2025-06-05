import React from "react";
import { FaBroom } from "react-icons/fa6";
import Select from "react-select";

const VehicleForm = ({
  formData,
  onChange,
  onSubmit,
  drivers,
  editMode,
  onClear,
}) => {
  // Opciones para react-select basado en drivers
  const propietarioOptions = drivers.map((driver) => ({
    value: driver.curp,
    label: `${driver.nombre} ${driver.apellidos} (${driver.curp})`,
  }));

  // Encontrar la opción seleccionada para react-select
  const selectedPropietario =
    propietarioOptions.find((opt) => opt.value === formData.propietarioCurp) ||
    null;

  // Manejar cambio para react-select simulando evento para onChange
  const handlePropietarioChange = (selectedOption) => {
    onChange({
      target: {
        name: "propietarioCurp",
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mb-6 bg-white p-4 rounded shadow relative"
    >
      {/* Botón limpiar */}
      <button
        type="button"
        onClick={onClear}
        className="absolute top-2 right-2 bg-[#B33A3A] hover:bg-[#4C0022] text-white font-semibold px-3 py-1 rounded flex items-center gap-2 shadow transition-colors"
        title="Limpiar formulario"
      >
        <FaBroom size={18} />
        <span className="text-xs md:inline">Limpiar</span>
      </button>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        {/* Propietario */}
        <div className="relative w-full group">
          <Select
            options={propietarioOptions}
            value={selectedPropietario}
            onChange={handlePropietarioChange}
            placeholder="Seleccione o escriba el propietario"
            isClearable
            isSearchable
            className="custom-react-select"
            classNamePrefix="custom-react-select"
            required
          />
          <label
            htmlFor="propietarioCurp"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:text-[#4C0022]"
          >
            Propietario (CURP)
          </label>
        </div>

        {/* Tipo */}
        <div className="relative z-0 w-full group">
          <select
            name="tipo"
            value={formData.tipo || ""}
            onChange={onChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-[#4C0022] peer"
          >
            <option value="">Tipo de vehículo</option>
            <option value="Automóvil">Automóvil</option>
            <option value="Motocicleta">Motocicleta</option>
            <option value="Camión">Camión</option>
            <option value="Trailer">Trailer</option>
          </select>
          <label
            htmlFor="tipo"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:text-[#4C0022]"
          >
            Tipo de Vehículo
          </label>
        </div>

        {/* Placa */}
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="placa"
            value={formData.placa || ""}
            onChange={onChange}
            required
            placeholder=" "
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#4C0022] peer"
          />
          <label
            htmlFor="placa"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#4C0022]"
          >
            Placa
          </label>
        </div>

        {/* Marca */}
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="marca"
            value={formData.marca || ""}
            onChange={onChange}
            required
            placeholder=" "
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#4C0022] peer"
          />
          <label
            htmlFor="marca"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#4C0022]"
          >
            Marca
          </label>
        </div>

        {/* Modelo */}
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="modelo"
            value={formData.modelo || ""}
            onChange={onChange}
            required
            placeholder=" "
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#4C0022] peer"
          />
          <label
            htmlFor="modelo"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#4C0022]"
          >
            Modelo
          </label>
        </div>

        {/* Tarjeta */}
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="tarjeta"
            value={formData.tarjeta || ""}
            onChange={onChange}
            required
            placeholder=" "
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#4C0022] peer"
          />
          <label
            htmlFor="tarjeta"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#4C0022]"
          >
            Tarjeta de Circulación
          </label>
        </div>

        {/* Tarjeta Vencimiento */}
        <div className="relative z-0 w-full group">
          <input
            type="date"
            name="tarjetaVencimiento"
            value={formData.tarjetaVencimiento || ""}
            onChange={onChange}
            required
            placeholder=" "
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#4C0022] peer"
          />
          <label
            htmlFor="tarjetaVencimiento"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#4C0022]"
          >
            Vencimiento Tarjeta
          </label>
        </div>
      </div>

      {/* Fila del botón */}
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-[#4C0022] text-white p-2 rounded hover:bg-[#6a0040] min-w-[180px]"
        >
          {editMode ? "Actualizar Vehículo" : "Agregar Vehículo"}
        </button>
      </div>
    </form>
  );
};

export default VehicleForm;
