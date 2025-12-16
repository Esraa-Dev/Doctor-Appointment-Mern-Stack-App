import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useVerifyResetOtp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.verifyResetOtp,

    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/reset-password", { state: data.data });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "فشل التحقق من الرمز");
    },
  });
};
