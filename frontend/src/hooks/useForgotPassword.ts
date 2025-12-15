import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { toast } from "react-toastify";
import { getApiErrorMessage } from "../utils/apiError";
import { useNavigate } from "react-router-dom";

export const useForgotPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: (data) => {
      toast.success(data?.message || "تم إرسال رمز التحقق إلى بريدك");
      navigate("/verify-reset-otp", { state: data.data });
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, "حدث خطأ ما"));
    },
  });
};
