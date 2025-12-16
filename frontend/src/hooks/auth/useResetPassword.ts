import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/authService";
import { toast } from "react-toastify";
import { getApiErrorMessage } from "../../utils/apiError";
import { useNavigate } from "react-router-dom";

export const useResetPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, "حدث خطأ أثناء التحقق"));
    },
  });
};
