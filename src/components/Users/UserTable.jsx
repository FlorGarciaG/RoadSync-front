import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const UserTable = ({ usuarios, onEdit, onDelete, currentUser }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse shadow-sm">
        <thead className="bg-[#f3e7e7]">
          <tr>
            <th className="p-3 text-left border-b border-[#e0c9c9]">Nombre</th>
            <th className="p-3 text-left border-b border-[#e0c9c9]">
              Apellidos
            </th>
            <th className="p-3 text-left border-b border-[#e0c9c9]">Rol</th>
            <th className="p-3 text-left border-b border-[#e0c9c9]">Correo</th>
            <th className="p-3 text-center border-b border-[#e0c9c9]">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr
              key={usuario.idUsuario}
              className="hover:bg-[#faf5f5] border-b border-[#e0c9c9]"
            >
              <td className="p-3">{usuario.nombre}</td>
              <td className="p-3">{usuario.apellidos}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    usuario.rol === "ADMIN"
                      ? "bg-[#4C0022] text-white"
                      : "bg-[#e0c9c9] text-[#4C0022]"
                  }`}
                >
                  {usuario.rol}
                </span>
              </td>
              <td className="p-3 text-[#6b7280]">{usuario.correo}</td>
              <td className="p-3">
                <div className="flex justify-center space-x-2">
                  {/* Solo muestra el botón si NO es el usuario logueado */}
                  {currentUser?.idUsuario !== usuario.idUsuario && (
                    <>
                      <button
                        onClick={() => onEdit(usuario)}
                        className="flex items-center gap-1 bg-[#D9B26F] text-[#4C0022] px-3 py-1 rounded hover:bg-[#c3a661] transition-colors"
                        aria-label="Editar usuario"
                      >
                        <FiEdit size={16} />
                        <span className="hidden md:inline">Editar</span>
                      </button>
                      <button
                        onClick={() => {
                          if (!usuario.idUsuario) {
                            console.error("ID de usuario no definido", usuario);
                            return;
                          }
                          onDelete(usuario.idUsuario);
                        }}
                        className="flex items-center gap-1 bg-[#B33A3A] text-white px-3 py-1 rounded hover:bg-[#8b2e2e]"
                      >
                        <FiTrash2 size={16} />
                        Eliminar
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {usuarios.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No hay usuarios registrados
        </div>
      )}
    </div>
  );
};

export default UserTable;
