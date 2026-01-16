import { createContext, useContext, useCallback } from "react";
import { useGetCurrentUser } from "../hooks/auth/useGetCurrentUser";
import { useLogout } from "../hooks/auth/useLogout";
import Loading from "../components/ui/Loading";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "patient" | "doctor" | "admin";
  image?: string;
  isEmailVerified: boolean;
  profileStatus: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, isError } = useGetCurrentUser();
  const { mutate: logoutMutation } = useLogout();

  const logout = useCallback(() => {
    logoutMutation();
  }, [logoutMutation]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        isAuthenticated: !!user && !isError,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};