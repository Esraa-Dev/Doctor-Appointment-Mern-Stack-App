import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../services/authService";
import { toast } from "react-toastify";
import { getApiErrorMessage } from "../../utils/apiError";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setAuthState } from "../../utils/authState";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation(['auth', 'common']);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      toast.success(data?.message || t("auth.loginSuccess"));

      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });

      const user = data.data?.user;

      if (!user) {
        navigate("/");
        return;
      }
      
      setAuthState(true);
      
      if (user.role === "doctor") {
        if (user.profileStatus === "incomplete") {
          navigate("/doctor/onboarding", { replace: true });
        } else {
          navigate("/doctor/dashboard", { replace: true });
        }
      } else if (user.role === "patient") {
        navigate("/", { replace: true });
      } else if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, t("common.defaultError")));
    },
  });
};