import { useQuery } from "@tanstack/react-query";
import { patientService } from "../../services/patientService";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["patientProfile"],
    queryFn: patientService.getPatientProfile,
    staleTime: 5 * 60 * 1000,
  });
};
