import api from "./axiosInstance";

export const authService = {
  login: async (data) => {
    const response = await api.post("auth/login", data);
    return response.data;
  },
  register: async (data) => {
    const response = await api.post("auth/register", data);
    return response.data;
  },
  verifyEmail: async (data) => {
    const response = await api.post("auth/verify-email", data);
    return response.data;
  },
  forgotPassword: async (data) => {
    const response = await api.post("auth/forgot-password", data);
    return response.data;
  },
  verifyResetOtp: async (data) => {
    const response = await api.post("auth/verify-reset-otp", data);
    return response.data;
  },
    resetPassword: async (data) => {
    const response = await api.post("auth/reset-password", data);
    return response.data;
  },
};
