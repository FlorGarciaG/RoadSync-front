import api from "./api";

export const userService = {
  // Registro de usuario
  registrarUsuario: async (usuario) => {
    try {
      const response = await api.post("/usuario/registro", usuario);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || "Error al registrar usuario");
    }
  },

  // Obtener todos los usuarios
  obtenerUsuarios: async () => {
    try {
      const response = await api.get("/usuario/all");
      return response.data;
    } catch (error) {
      throw new Error("Error al cargar usuarios");
    }
  },

  // Actualizar usuario
  actualizarUsuario: async (id, usuarioActualizado) => {
    try {
      const response = await api.put(`/usuario/${id}`, usuarioActualizado);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || "Error al actualizar usuario");
    }
  },

  // Eliminar usuario
  eliminarUsuario: async (id) => {
    try {
      const response = await api.delete(`/usuario/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || "Error al eliminar usuario");
    }
  },
};
