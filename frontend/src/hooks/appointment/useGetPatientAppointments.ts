import { useQuery } from "@tanstack/react-query";
import { appointmentService } from "../../services/appointmentService";

export const useGetPatientAppointments = (filters?: { status?: string }) => {
  return useQuery({
    queryKey: ["patientAppointments", filters],
    queryFn: () => appointmentService.getPatientAppointments(filters),
    staleTime: 5 * 60 * 1000,
  });
};
