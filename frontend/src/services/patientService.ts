import api from "./axiosInstance";

export const patientService = {
  getPatientProfile: async () => {
    const response = await api.get("patient/profile");
    return response.data.data;
  },
   updateProfileInfo: async (data: any) => {
    const response = await api.put("patient/profile", data);
    return response.data.data;
  },
};
