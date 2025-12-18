import api from "./axiosInstance";

export const patientService = {
  getPatientProfile: async () => {
    const response = await api.get("patient/profile");
    return response.data.data;
  },
};
