import api from "./api";

const endpoint = "/multa";

export const multaService = {
    // Obtener todas las multas
    getAll: async () => {
        try {
            const res = await api.get(`${endpoint}/all`);
            return res.data;
        } catch (error) {
            throw new Error("Error al cargar multas");
        }
    },

    // Registrar multa
    create: async (data) => {
        try {
            const res = await api.post(`${endpoint}/registro`, data);
            return res.data;
        } catch (error) {
            throw new Error(error.response?.data || "Error al registrar multa");
        }
    },

    // Actualizar multa
    update: async (id, data) => {
        try {
            const res = await api.put(`${endpoint}/${id}`, data);
            return res.data;
        } catch (error) {
            throw new Error(error.response?.data || "Error al actualizar multa");
        }
    },

    // Eliminar multa
    delete: async (id) => {
        try {
            const res = await api.delete(`${endpoint}/${id}`);
            return res.data;
        } catch (error) {
            throw new Error(error.response?.data || "Error al eliminar multa");
        }
    },

    // Buscar multas por placa de vehículo
    findByPlaca: async (placa) => {
        try {
            const res = await api.get(`${endpoint}/buscar/vehiculo?placa=${placa}`);
            return res.data;
        } catch (error) {
            throw new Error(
                error.response?.data || "Error al buscar multas por placa"
            );
        }
    },
};
