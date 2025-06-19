import api from "./api";

const endpoint = "/incidencia";

export const incidenteService = {
    // Obtener todas las incidencias
    getAll: async () => {
        try {
            const res = await api.get(`${endpoint}/all`);
            return res.data;
        } catch (error) {
            throw new Error("Error al cargar incidencias");
        }
    },

    // Registrar incidencia
    create: async (data) => {
        try {
            const res = await api.post(`${endpoint}/registro`, data);
            return res.data;
        } catch (error) {
            throw new Error(error.response?.data || "Error al registrar incidencia");
        }
    },

    // Actualizar incidencia
    update: async (id, data) => {
        try {
            const res = await api.put(`${endpoint}/${id}`, data);
            return res.data;
        } catch (error) {
            throw new Error(error.response?.data || "Error al actualizar incidencia");
        }
    },

    // Eliminar incidencia
    delete: async (id) => {
        try {
            const res = await api.delete(`${endpoint}/${id}`);
            return res.data;
        } catch (error) {
            throw new Error(error.response?.data || "Error al eliminar incidencia");
        }
    },

    // Buscar incidencias por placa de vehículo
    findByPlaca: async (placa) => {
        try {
            const res = await api.get(`${endpoint}/buscar/vehiculo?placa=${placa}`);
            return res.data;
        } catch (error) {
            throw new Error(
                error.response?.data || "Error al buscar incidencias por placa"
            );
        }
    },
};