import api from "./api";

const endpoint = "/propietario";

export const driversService = {
  // Obtener todos los propietarios
  getAll: async () => {
    try {
      const res = await api.get(`${endpoint}/all`);
      return res.data;
    } catch (error) {
      throw new Error("Error al cargar propietarios");
    }
  },

  // Obtener propietario por CURP
  getByCurp: async (curp) => {
    try {
      const res = await api.get(`${endpoint}/${curp}`);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data || "Error al obtener propietario");
    }
  },

  // Registrar propietario
  create: async (data) => {
    try {
      const res = await api.post(`${endpoint}/registro`, data);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data || "Error al registrar propietario");
    }
  },

  // Actualizar propietario
  update: async (curp, data) => {
    try {
      const res = await api.put(`${endpoint}/${curp}`, data);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data || "Error al actualizar propietario");
    }
  },

  // Eliminar propietario
  delete: async (curp) => {
    try {
      const res = await api.delete(`${endpoint}/${curp}`);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data || "Error al eliminar propietario");
    }
  },
};