import React from "react";
import { FaBroom } from "react-icons/fa6";

const CURP_REGEX = /^[A-Z]{4}[0-9]{6}[HM]{1}[A-Z]{5}[A-Z0-9]{2}$/;
const RFC_GENERICO = "XAXX010101000";

const DriverForm = ({
  formData,
  onChange,
  onSubmit,
  editMode,
  onClear,
  homoclave,
  setHomoclave,
  useGenericRfc,
  setUseGenericRfc,
}) => {
  const [curpError, setCurpError] = React.useState("");

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const minDate = `${yyyy}-${mm}-${dd}`;
  const maxDate = `${yyyy + 10}-${mm}-${dd}`;

  const getRfcFromCurp = () => {
    if (formData.curp && formData.curp.length >= 10 && homoclave.length === 3) {
      return formData.curp.substring(0, 10) + homoclave.toUpperCase();
    }
    return "";
  };

  const handleCurpChange = (e) => {
    onChange(e);
    setCurpError("");
  };

  const handleHomoclaveChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (value.length <= 3) setHomoclave(value);
  };

  const handleGenericRfcChange = (e) => {
    setUseGenericRfc(e.target.checked);
    if (e.target.checked) {
      setHomoclave("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.curp || formData.curp.length !== 18) {
      setCurpError("La CURP debe tener exactamente 18 caracteres.");
      return;
    }
    if (!CURP_REGEX.test(formData.curp)) {
      setCurpError("CURP no válido. Debe cumplir el formato oficial.");
      return;
    }
    setCurpError("");

    let rfcFinal = "";
    if (useGenericRfc) {
      rfcFinal = RFC_GENERICO;
    } else {
      if (homoclave.length !== 3) {
        alert("La homoclave debe tener exactamente 3 caracteres.");
        return;
      }
      rfcFinal = getRfcFromCurp();
      if (rfcFinal.length !== 13) {
        alert("El RFC generado debe tener 13 caracteres.");
        return;
      }
    }

    onSubmit({ ...formData, rfc: rfcFinal });
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
        <div className="flex items-center gap-2">
          <div className="relative w-2/3">
            <input
              type="text"
              value={
                useGenericRfc
                  ? RFC_GENERICO
                  : formData.curp
                  ? formData.curp.substring(0, 10)
                  : ""
              }
              disabled
              placeholder=" "
              className="peer block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#4C0022]"
            />
            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-1 left-0 origin-[0] peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#4C0022]">
              RFC (Base)
            </label>
          </div>

          <span className="mt-2">-</span>

          <div className="relative w-20">
            <input
              type="text"
              value={useGenericRfc ? "" : homoclave}
              onChange={handleHomoclaveChange}
              disabled={useGenericRfc}
              maxLength={3}
              placeholder=" "
              className="peer block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#4C0022]"
            />
            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-1 left-0 origin-[0] peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#4C0022]">
              Homoclave
            </label>
          </div>

          <div className="flex items-center ml-4 mt-2">
            <input
              type="checkbox"
              id="rfcGenerico"
              checked={useGenericRfc}
              onChange={handleGenericRfcChange}
              className="mr-1"
            />
            <label
              htmlFor="rfcGenerico"
              className="text-xs text-gray-600 whitespace-nowrap"
            >
              Genérico
            </label>
          </div>
        </div>
      </div>

      <div className="relative z-0 w-full group">
        <input
          type="date"
          name="licenciaVencimiento"
          value={formData.licenciaVencimiento}
          onChange={onChange}
          required
          min={minDate}
          max={maxDate}
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
