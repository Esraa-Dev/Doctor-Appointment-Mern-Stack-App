import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "../../utils/apiError";
import { useTranslation } from "react-i18next";
import { setAuthState } from "../../utils/authState";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], null);
      toast.success(data.message);
      navigate("/login");
       setAuthState(false); 
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, t("common:defaultError")));
    },
  });
};
