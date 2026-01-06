import { useQuery } from "@tanstack/react-query";
import { doctorService } from "../../services/doctorService";
import type { DoctorFilters } from "../../types/types";

export const useGetDoctors = (filters: DoctorFilters) => {
  return useQuery({
    queryKey: ["doctors", filters],
    queryFn: () => doctorService.getDoctors(filters),
    staleTime: 5 * 60 * 1000,
  });
};