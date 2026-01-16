export const setAuthState = (value: boolean) => {
  if (value) {
    localStorage.setItem("isAuthenticated", "true");
  } else {
    localStorage.removeItem("isAuthenticated");
  }
};

export const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};
