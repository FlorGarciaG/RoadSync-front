import api from "./api";

export const AuthService = {
  login: async (usuario) => {
    try {
      const response = await api.post("/usuario/login", usuario);
      return { success: true, data: response.data };
    } catch (error) {
      const msg = error.response?.data?.message || "Error al autenticar";
      return { success: false, error: msg, status: error.response?.status };
    }
  },
};
