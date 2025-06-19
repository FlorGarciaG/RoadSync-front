import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const DriverTable = ({ drivers, onEdit, onDelete }) => {
  return (
    <table className="w-full border-collapse bg-white rounded shadow">
      <thead>
        <tr className="bg-[#f3e7e7]">
          <th className="p-2 border">Nombres</th>
          <th className="p-2 border">Apellidos</th>
          <th className="p-2 border">CURP</th>
          <th className="p-2 border">RFC</th>
          <th className="p-2 border">Vencimiento Licencia</th>
          <th className="p-2 border">Número Licencia</th>
          <th className="p-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {drivers.length === 0 ? (
          <tr>
            <td colSpan="7" className="text-center p-4 text-gray-500">
              No hay drivers registrados.
            </td>
          </tr>
        ) : (
          drivers.map((driver, index) => (
            <tr key={index} className="border-t">
              <td className="p-2 border">{driver.nombre}</td>
              <td className="p-2 border">{driver.apellidos}</td>
              <td className="p-2 border">{driver.curp}</td>
              <td className="p-2 border">{driver.rfc}</td>
              <td className="p-2 border">{driver.licenciaVencimiento}</td>
              <td className="p-2 border">{driver.licencia}</td>
              <td className="p-2 border space-x-2 flex justify-center">
                <button
                  onClick={() => onEdit(index)}
                  className="flex items-center gap-1 bg-[#D9B26F] text-[#4C0022] px-3 py-1 rounded hover:bg-[#c3a661]"
                  aria-label="Editar driver"
                  title="Editar"
                >
                  <FiEdit size={16} />
                  Editar
                </button>
                <button
                  onClick={() => onDelete(index)}
                  className="flex items-center gap-1 bg-[#B33A3A] text-white px-3 py-1 rounded hover:bg-[#8b2e2e]"
                  aria-label="Eliminar driver"
                  title="Eliminar"
                >
                  <FiTrash2 size={16} />
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default DriverTable;
