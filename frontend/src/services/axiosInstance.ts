import axios from "axios";
import i18next from "i18next";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const addLanguageInterceptor = (instance: any) => {
  instance.interceptors.request.use((config: any) => {
    const currentLanguage = i18next.language || "en";
    config.headers["Accept-Language"] = currentLanguage;
    return config;
  });
};

addLanguageInterceptor(api);
addLanguageInterceptor(authApi);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        await authApi.post("auth/refresh-token");
        return api(originalRequest);
      } catch (refreshError) {
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    if (
      error.response?.status === 401 &&
      (originalRequest.url.includes("/auth/login") ||
        originalRequest.url.includes("/auth/refresh-token"))
    ) {
      await authApi.post("auth/logout");
    }

    return Promise.reject(error);
  }
);

export default api;
export { authApi };