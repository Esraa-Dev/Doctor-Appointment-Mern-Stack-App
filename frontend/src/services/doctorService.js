import api from "./axiosInstance";
export const getDoctorCount = async () => {
  const response = await api.get("doctors/count");
  return response;
}