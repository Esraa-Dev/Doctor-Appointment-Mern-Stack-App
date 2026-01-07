import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getApiErrorMessage } from "../../utils/apiError";
import { patientService } from "../../services/patientService";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: patientService.updateProfile,
    onSuccess: (data) => {
      toast.success(data?.message || "Profile updated successfully!");
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, "حدث خطأ ما"));
    },
  });
};
