import { Navigate, Outlet } from "react-router-dom";
import { useGetCurrentUser } from "../hooks/auth/useGetCurrentUser"
import type { ProtectedRouteProps } from "../types/types";
import Loading from "../components/ui/Loading";

export const ProtectedRoute = ({ allowedRoles = [] }: ProtectedRouteProps) => {
    const { data: user, isLoading } = useGetCurrentUser()
    if (isLoading) {
        return <Loading/>
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return <Navigate to="/no-access" replace />;
    }
    return <Outlet />;
}