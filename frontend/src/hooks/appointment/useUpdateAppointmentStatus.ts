import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appointmentService } from "../../services/appointmentService";
import { toast } from "react-toastify";
import { getApiErrorMessage } from "../../utils/apiError";

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      appointmentId,
      status,
    }: {
      appointmentId: string;
      status: string;
    }) => appointmentService.updateAppointmentStatus(appointmentId, status),
    onSuccess: (data, variables) => {
      toast.success(data?.message || "تم تحديث حالة الموعد بنجاح");
      queryClient.invalidateQueries({ queryKey: ["doctorAppointments"] });
      queryClient.invalidateQueries({
        queryKey: ["appointment", variables.appointmentId],
      });
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, "فشل تحديث حالة الموعد"));
    },
  });
};
