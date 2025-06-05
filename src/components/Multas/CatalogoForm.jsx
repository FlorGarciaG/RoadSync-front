import React, { useState, useEffect } from "react";
import { FaDollarSign } from "react-icons/fa";

const CatalogoForm = ({ formData, onChange, onSubmit, isEditing, onCancel, submitting }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="relative z-0 w-full group">
      <label
        htmlFor="tipo"
        className="block text-sm text-gray-500 mb-1"
      >
        Tipo de multa
      </label>
      <input
        type="text"
        name="tipo"
        value={formData.tipo}
        onChange={onChange}
        required
        placeholder="Ingrese tipo de multa"
        className="w-full pl-3 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f3e7e7]"
      />
    </div>
    <div className="relative z-0 w-full group">
      <label
        htmlFor="monto"
        className="block text-sm text-gray-500 mb-1"
      >
        Monto (MXN)
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
          <FaDollarSign />
        </span>
        <input
          type="number"
          name="monto"
          value={formData.monto}
          onChange={onChange}
          required
          min={0.01}
          step="0.01"
          placeholder="Ingrese monto"
          className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f3e7e7]"
        />
      </div>
    </div>
    <div className="flex gap-2 justify-end">
      <button
        type="button"
        onClick={onCancel}
        className="bg-gray-300 text-[#4C0022] px-4 py-2 rounded hover:bg-gray-400 transition-colors"
        disabled={submitting}
      >
        Cancelar
      </button>
      <button
        type="submit"
        className="bg-[#4C0022] text-white px-4 py-2 rounded hover:bg-[#6a0040] transition-colors"
        disabled={submitting}
      >
        {submitting
          ? (isEditing ? "Actualizando..." : "Agregando...")
          : (isEditing ? "Actualizar" : "Agregar")}
      </button>
    </div>
  </form>
);

export default CatalogoForm;