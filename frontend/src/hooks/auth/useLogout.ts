import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], null);
      toast.success(data.message);
      navigate("/login");
      console.log(data);
    },

    onError: (error: any) => {
      console.log(error);
      toast.error(error?.response?.data?.message || "فشل التحقق من الرمز");
    },
  });
};
