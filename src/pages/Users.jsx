import React, { useState, useEffect } from "react";
import UsuarioForm from "../components/Users/UserForm";
import UsuarioTable from "../components/Users/UserTable";
import { userService } from "../services/userService";
import Swal from "sweetalert2";

const Users = ({ userData }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    rol: "Empleado",
    correo: "",
    password: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cargar usuarios al iniciar
  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    setLoading(true);

    try {
      const data = await userService.obtenerUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      alert("No se pudieron cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await userService.actualizarUsuario(editId, formData);
        Swal.fire("Éxito", "Usuario actualizado con éxito", "success");
      } else {
        await userService.registrarUsuario(formData);
        Swal.fire("Éxito", "Usuario registrado con éxito", "success");
      }
      setFormData({
        nombre: "",
        apellidos: "",
        rol: "Empleado",
        correo: "",
        password: "",
      });
      setEditId(null);
      cargarUsuarios();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message ||
          error.message ||
          "Error al procesar la solicitud",
        "error"
      );
    }
  };

  const handleEdit = (usuario) => {
    setEditId(usuario.idUsuario);
    setFormData({
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      rol: usuario.rol,
      correo: usuario.correo,
      password: "",
    });
  };

  const handleDelete = async (id) => {
    if (!id) {
      Swal.fire("Error", "ID de usuario no válido", "error");
      return;
    }

    const result = await Swal.fire({
      title: "¿Estás seguro de eliminar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#4C0022",
    });

    if (result.isConfirmed) {
      try {
        await userService.eliminarUsuario(id);
        Swal.fire("Eliminado", "Usuario eliminado correctamente", "success");
        cargarUsuarios();

        if (editId === id) {
          setEditId(null);
          setFormData({
            nombre: "",
            apellidos: "",
            rol: "Empleado",
            correo: "",
            password: "",
          });
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
        Swal.fire(
          "Error",
          error.response?.data?.message ||
            error.message ||
            "Error al eliminar usuario",
          "error"
        );
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-5 text-[#4C0022]">
        Gestión de Empleados
      </h1>
      <UsuarioForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEditing={editId !== null}
      />
      {/* Spinner de carga */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <svg
            className="animate-spin h-8 w-8 text-[#4C0022]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
          <span className="ml-3 text-[#4C0022] font-medium">Cargando...</span>
        </div>
      ) : (
        <>
          <UsuarioTable
            usuarios={usuarios}
            onEdit={handleEdit}
            onDelete={handleDelete}
            currentUser={userData}
          />
        </>
      )}
    </div>
  );
};

export default Users;
