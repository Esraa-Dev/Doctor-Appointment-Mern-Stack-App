import api from "./axiosInstance.js";
export const getDepartmentCount = async () => {
  const response = await api.get("departments/count");
  return response;
};
