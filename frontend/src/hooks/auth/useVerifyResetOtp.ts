import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "../../utils/apiError";

export const useVerifyResetOtp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.verifyResetOtp,

    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/reset-password", { state: data.data });
    },

    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, "حدث خطأ ما"));
    },
  });
};
