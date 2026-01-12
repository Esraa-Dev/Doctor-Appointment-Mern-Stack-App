import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { appointmentService } from "../../services/appointmentService";
import { toast } from "react-toastify";
import { useSocket } from "../../context/SocketContext";

export const useStartConsultation = () => {
  const queryClient = useQueryClient();
  const socket = useSocket();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (variables: { id: string; type: string }) => 
      appointmentService.startConsultation(variables),

    onSuccess: (response) => {
      console.log(response)
      const { roomId, type, patientId, doctorId } = response.data;

      queryClient.invalidateQueries({ queryKey: ["doctorAppointments"] });

      if (socket) {
        socket.emit("start-call", {
          patientId: patientId?._id || patientId,
          roomId: roomId,
          type: type,
          doctorName: `د. ${doctorId?.lastName || ""}`,
        });
      }

      navigate(`/video-call/${roomId}?type=${type}&role=doctor`);
      toast.success(response.message || "Starting call...");
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to start call");
    },
  });
};