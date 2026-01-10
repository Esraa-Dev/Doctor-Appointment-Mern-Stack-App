import { useState } from "react";
import { Calendar, Clock, Phone, User, Video } from "lucide-react";
import type { Appointment } from "../../../types/types";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { useUpdateAppointmentStatus } from "../../../hooks/appointment/useUpdateAppointmentStatus";

interface AppointmentCardProps {
  appointment: Appointment;
}

export const DoctorAppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdateAppointmentStatus();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusArabic = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "مجدول";
      case "In Progress":
        return "جاري التنفيذ";
      case "Completed":
        return "مكتمل";
      case "Cancelled":
        return "ملغي";
      default:
        return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "voice":
        return <Phone className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeArabic = (type: string) => {
    switch (type) {
      case "video":
        return "استشارة فيديو";
      case "voice":
        return "مكالمة هاتفية";
      default:
        return "زيارة عيادة";
    }
  };

  const handleStatusUpdate = (newStatus: string) => {
    updateStatus({
      appointmentId: appointment._id,
      status: newStatus
    });
  };


  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-4 flex-wrap">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              {appointment.patientId?.image ? (
                <img
                  src={appointment.patientId.image}
                  alt={`${appointment.patientId?.firstName || ''} ${appointment.patientId?.lastName || ''}`}
                  className="w-12 h-12 rounded-xl object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-primary" />
              )}
            </div>

            <div>
              <h3 className="text-lg font-bold text-primaryText mb-1">
                {appointment.patientId?.firstName || 'المريض'} {appointment.patientId?.lastName || ''}
              </h3>
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {getStatusArabic(appointment.status)}
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-800">
                  {getTypeIcon(appointment.type)}
                  {getTypeArabic(appointment.type)}
                </span>
              </div>
            </div>
          </div>

          <div className="text-left">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">
                {format(new Date(appointment.appointmentDate), "d MMMM yyyy", { locale: ar })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="font-medium">
                {appointment.startTime} - {appointment.endTime}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-primaryText text-base font-bold">
            الرسوم: <span className="text-primary">{appointment.fee} ج.م</span>
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-secondary hover:underline cursor-pointer"
            >
              {showDetails ? "إخفاء التفاصيل" : "عرض التفاصيل"}
            </button>

            {appointment.type === "clinic" && (
              <>
                {appointment.status === "Scheduled" && (
                  <button
                    disabled={isUpdatingStatus}
                    onClick={() => handleStatusUpdate("In Progress")}
                    className="text-primary font-medium hover:underline cursor-pointer disabled:opacity-50"
                  >
                    {isUpdatingStatus ? "جاري البدء..." : "بدء الموعد"}
                  </button>
                )}

                {appointment.status === "In Progress" && (
                  <button
                    disabled={isUpdatingStatus}
                    onClick={() => handleStatusUpdate("Completed")}
                    className="text-red-500 font-medium hover:underline cursor-pointer disabled:opacity-50"
                  >
                    {isUpdatingStatus ? "جاري الإنهاء..." : "إنهاء الموعد"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {showDetails && appointment.symptoms && (
          <div className="mt-4">
            <h4 className="font-semibold text-gray-700 mb-3">وصف الأعراض:</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">{appointment.symptoms}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};