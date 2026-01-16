import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "../../utils/apiError";
import { useTranslation } from "react-i18next";

export const useVerifyResetOtp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: authService.verifyResetOtp,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/reset-password", { state: data.data });
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, t("common:defaultError")));
    },
  });
};
