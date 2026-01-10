import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getApiErrorMessage } from "../../utils/apiError";
import { doctorService } from "../../services/doctorService";

export const useUpdateDoctorProfile = () => {
  return useMutation({
    mutationFn: (data: any) => doctorService.updateDoctorProfile(data),
    onSuccess: (data) => {
      toast.success(data?.message || "تم تحديث الملف الشخصي بنجاح!");
    },
    onError: (error: any) => {
      const errorMessage = getApiErrorMessage(error) || "حدث خطأ أثناء تحديث الملف الشخصي";
      toast.error(errorMessage);
    },
  });
};