import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { patientService } from "../../services/patientService";
import { getApiErrorMessage } from "../../utils/apiError";

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patientService.updateProfileImage,
    onSuccess: (data) => {
      toast.success(data?.message || "Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["patientProfile"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, "Failed to upload image"));
    },
  });
};
