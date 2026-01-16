import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getApiErrorMessage } from "../../utils/apiError";
import { authService } from "../../services/authService";
import { useTranslation } from "react-i18next";

export const useResendOtp = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: authService.resendOtp,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, t("common:defaultError")));
    },
  });
};
