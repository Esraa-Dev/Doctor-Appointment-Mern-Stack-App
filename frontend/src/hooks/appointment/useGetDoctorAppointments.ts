import { useQuery } from "@tanstack/react-query";
import { appointmentService } from "../../services/appointmentService";

interface DoctorAppointmentsParams {
  status?: string | string[]; 
  date?: string;
}

export const useGetDoctorAppointments = (params?: DoctorAppointmentsParams) => {
  return useQuery({
    queryKey: ["doctorAppointments", params],
    queryFn: () => appointmentService.getDoctorAppointments(params),
    staleTime: 5 * 60 * 1000, 
  });
};