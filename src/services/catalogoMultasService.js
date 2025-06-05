import api from "./api";

const endpoint = "/catalogo";

const catalogoMultasService = {
  // Obtener todos los tipos de multa
  getAll: async () => {
    try {
      const res = await api.get(`${endpoint}/all`);
      return res.data;
    } catch (error) {
      throw new Error("Error al cargar el catálogo de multas");
    }
  },

  // Registrar un nuevo tipo de multa
  create: async (data) => {
    try {
      const res = await api.post(`${endpoint}/registro`, data);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data || "Error al registrar tipo de multa");
    }
  },

  // Actualizar un tipo de multa
  update: async (id, data) => {
    try {
      const res = await api.put(`${endpoint}/${id}`, data);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data || "Error al actualizar tipo de multa");
    }
  },

  // Eliminar un tipo de multa
  delete: async (id) => {
    try {
      const res = await api.delete(`${endpoint}/${id}`);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data || "Error al eliminar tipo de multa");
    }
  },
};

export default catalogoMultasService;