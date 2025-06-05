import React, { useState } from "react";
import { FaBroom } from "react-icons/fa6"; 

const CURP = /^[A-Z]{4}[0-9]{6}[HM]{1}[A-Z]{5}[A-Z0-9]{2}$/;

const DriverForm = ({ formData, onChange, onSubmit, editMode, onClear }) => {
  const [curpError, setCurpError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.curp || formData.curp.length !== 18) {
      setCurpError("La CURP debe tener exactamente 18 caracteres.");
      return;
    }
    if (!CURP.test(formData.curp)) {
      setCurpError("CURP no válido. Debe cumplir el formato oficial.");
      return;
    }
    setCurpError("");
    if (formData.rfc && formData.rfc.length !== 13) {
      alert("El RFC debe tener exactamente 13 caracteres.");
      return;
    }
    onSubmit(e);
  };

  const handleCurpChange = (e) => {
    onChange(e);
    setCurpError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded shadow relative"
    >
      <button
        type="button"
        onClick={onClear}
        className="absolute top-2 right-2 bg-[#B33A3A] hover:bg-[#4C0022] text-white font-semibold px-3 py-1 rounded flex items-center gap-2 shadow transition-colors"
        title="Limpiar formulario"
      >
        <FaBroom size={18} />
        <span className="text-xs md:inline">Limpiar</span>
      </button>
      
      <div className="relative z-0 w-full group mt-5">
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={onChange}
          required
          placeholder=" "
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#4C0022] peer"
        />
        <label
          htmlFor="nombre"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] 
            peer-placeholder-shown:translate-y-0 
            peer-placeholder-shown:scale-100 
            peer-focus:-translate-y-6 
            peer-focus:scale-75 
            peer-focus:text-[#4C0022]"
        >
          Nombres
        </label>
      </div>

      <div className="relative z-0 w-full group mt-5">
        <input
          type="text"
          name="apellidos"
          value={formData.apellidos}
          onChange={onChange}
          required
          placeholder=" "
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#4C0022] peer"
        />
        <label
          htmlFor="apellidos"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] 
            peer-placeholder-shown:translate-y-0 
            peer-placeholder-shown:scale-100 
            peer-focus:-translate-y-6 
            peer-focus:scale-75 
            peer-focus:text-[#4C0022]"
        >
          Apellidos
        </label>
      </div>

      <div className="relative z-0 w-full group">
        <input
          type="text"
          name="curp"
          value={formData.curp}
          onChange={handleCurpChange}
          required
          minLength={18}
          maxLength={18}
          placeholder=" "
          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b ${
            curpError ? "border-red-500" : "border-gray-300"
          } appearance-none focus:outline-none focus:ring-0 focus:border-[#4C0022] peer`}
        />
        <label
          htmlFor="curp"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] 
            peer-placeholder-shown:translate-y-0 
            peer-placeholder-shown:scale-100 
            peer-focus:-translate-y-6 
            peer-focus:scale-75 
            peer-focus:text-[#4C0022]"
        >
          CURP
        </label>
        {curpError && (
          <span className="text-red-600 text-xs mt-1 block">{curpError}</span>
        )}
      </div>

      <div className="relative z-0 w-full group">
        <input
          type="text"
          name="rfc"
          value={formData.rfc}
          onChange={onChange}
          minLength={13}
          maxLength={13}
          placeholder=" "
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#4C0022] peer"
        />
        <label
          htmlFor="rfc"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] 
            peer-placeholder-shown:translate-y-0 
            peer-placeholder-shown:scale-100 
            peer-focus:-translate-y-6 
            peer-focus:scale-75 
            peer-focus:text-[#4C0022]"
        >
          RFC (opcional)
        </label>
      </div>

      <div className="relative z-0 w-full group">
        <input
          type="date"
          name="licenciaVencimiento"
          value={formData.licenciaVencimiento}
          onChange={onChange}
          required
          placeholder=" "
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#4C0022] peer"
        />
        <label
          htmlFor="licenciaVencimiento"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] 
            peer-placeholder-shown:translate-y-0 
            peer-placeholder-shown:scale-100 
            peer-focus:-translate-y-6 
            peer-focus:scale-75 
            peer-focus:text-[#4C0022]"
        >
          Fecha de Vencimiento Licencia
        </label>
      </div>

      <div className="relative z-0 w-full group">
        <input
          type="text"
          name="licencia"
          value={formData.licencia}
          onChange={onChange}
          required
          placeholder=" "
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#4C0022] peer"
        />
        <label
          htmlFor="licencia"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] 
            peer-placeholder-shown:translate-y-0 
            peer-placeholder-shown:scale-100 
            peer-focus:-translate-y-6 
            peer-focus:scale-75 
            peer-focus:text-[#4C0022]"
        >
          Número de Licencia
        </label>
      </div>

      <button
        type="submit"
        className="bg-[#4C0022] text-white p-2 rounded col-span-full hover:bg-[#6a0040]"
      >
        {editMode ? "Actualizar Propietario" : "Agregar Propietario"}
      </button>
    </form>
  );
};

export default DriverForm;
