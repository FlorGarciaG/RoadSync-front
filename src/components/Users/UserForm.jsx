import React, { useState } from 'react';
import { TbEye, TbEyeOff } from "react-icons/tb";

const UserForm = ({ formData, onChange, onSubmit, isEditing }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow">
      {/* Campo Nombre */}
      <div className="relative z-0 w-full group">
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={onChange}
          required
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#4C0022] peer"
          placeholder=" "
        />
        <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#4C0022]">
          Nombre
        </label>
      </div>

      {/* Campo Apellidos */}
      <div className="relative z-0 w-full group">
        <input
          type="text"
          name="apellidos"
          value={formData.apellidos}
          onChange={onChange}
          required
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#4C0022] peer"
          placeholder=" "
        />
        <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#4C0022]">
          Apellidos
        </label>
      </div>

      {/* Campo Rol - Ajustado para coincidir con el backend */}
      <div className="relative z-0 w-full group">
        <select
          name="rol"
          value={formData.rol}
          onChange={onChange}
          required
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#4C0022] peer"
        >
          <option value="" disabled hidden>Selecciona un rol</option>
          <option value="Administrador">Administrador</option>
          <option value="Empleado">Empleado</option>
        </select>
        <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#4C0022]">
          Rol
        </label>
      </div>

      {/* Campo Correo */}
      <div className="relative z-0 w-full group">
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={onChange}
          required
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#4C0022] peer"
          placeholder=" "
        />
        <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#4C0022]">
          Correo electrónico
        </label>
      </div>

      {/* Campo Contraseña */}
      {!isEditing && (
        <div className="relative z-0 w-full group">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={onChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#4C0022] peer pr-10"
            placeholder=" "
          />
          <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#4C0022]">
            Contraseña
          </label>
          <button
            type="button"
            aria-label="password toggle"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-[#7D0A3D]"
            tabIndex={-1}
          >
            {showPassword ? <TbEye size={20} /> : <TbEyeOff size={20} />}
          </button>
        </div>
      )}

      {/* Check y campo para actualizar contraseña en edición */}
      {isEditing && (
        <>
          <div className="col-span-full flex items-center gap-2">
            <input
              type="checkbox"
              id="edit-password"
              checked={editPassword}
              onChange={() => setEditPassword((prev) => !prev)}
              className="accent-[#4C0022]"
            />
            <label htmlFor="edit-password" className="text-sm text-[#4C0022] font-semibold">
              Modificar contraseña
            </label>
          </div>
          {editPassword && (
            <div className="relative z-0 w-full group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={onChange}
                required={editPassword}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#4C0022] peer pr-10"
                placeholder=" "
              />
              <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#4C0022]">
                Nueva contraseña
              </label>
              <button
                type="button"
                aria-label="password toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-[#7D0A3D]"
                tabIndex={-1}
              >
                {showPassword ? <TbEye size={20} /> : <TbEyeOff size={20} />}
              </button>
            </div>
          )}
        </>
      )}

      {/* Botón de envío */}
      <button
        type="submit"
        className="bg-[#4C0022] text-white p-2 rounded col-span-full hover:bg-[#6a0040] transition-colors"
      >
        {isEditing ? 'Actualizar Usuario' : 'Registrar Usuario'}
      </button>
    </form>
  );
};

export default UserForm;