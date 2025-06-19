import api from "./api";

const endpoint = "/vehiculo";

export const vehicleService = {
  // Obtener todos los vehículos
  getAll: async () => {
    try {
      const res = await api.get(`${endpoint}/all`);
      return res.data;
    } catch (error) {
      throw new Error("Error al cargar vehículos");
    }
  },

  // Obtener vehículo por ID
  getById: async (id) => {
    try {
      const res = await api.get(`${endpoint}/${id}`);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data || "Error al obtener vehículo");
    }
  },

  // Registrar vehículo
  create: async (data) => {
    try {
      const res = await api.post(`${endpoint}/registro`, data);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data || "Error al registrar vehículo");
    }
  },

  // Actualizar vehículo
  update: async (id, data) => {
    try {
      const res = await api.put(`${endpoint}/${id}`, data);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data || "Error al actualizar vehículo");
    }
  },

  // Eliminar vehículo
  delete: async (id) => {
    try {
      const res = await api.delete(`${endpoint}/${id}`);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data || "Error al eliminar vehículo");
    }
  },

  // Buscar vehículos por CURP de propietario
  findByPropietarioCurp: async (curp) => {
    try {
      const res = await api.get(`${endpoint}/buscar/propietario?curp=${curp}`);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data || "Error al buscar vehículos por propietario");
    }
  },

  // Buscar vehículos por placa
  findByPlaca: async (placa) => {
    try {
      const res = await api.get(`${endpoint}/buscar/placa?placa=${placa}`);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data || "Error al buscar vehículos por placa");
    }
  }
};