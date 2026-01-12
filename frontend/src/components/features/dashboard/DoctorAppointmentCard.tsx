import { useState } from "react";
import { Calendar, Clock, Phone, User, Video, ChevronDown, ChevronUp } from "lucide-react";
import type { Appointment } from "../../../types/types";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

import { useUpdateAppointmentStatus } from "../../../hooks/appointment/useUpdateAppointmentStatus";
import { useStartConsultation } from "../../../hooks/appointment/useStartConsultation";

interface AppointmentCardProps {
  appointment: Appointment;
  isOnline: boolean
}

export const DoctorAppointmentCard = ({ appointment, isOnline }: AppointmentCardProps) => {
  const [showDetails, setShowDetails] = useState(false);


  const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdateAppointmentStatus();
  const { mutate: startConsultation, isPending: isStartingCall } = useStartConsultation();

  const onStartCall = (type: "video" | "voice") => {
    startConsultation({
      id: appointment._id,
      type: type
    });
  };

  const handleStatusUpdate = (newStatus: string) => {
    updateStatus({
      appointmentId: appointment._id,
      status: newStatus
    });
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Scheduled": return "bg-blue-100 text-blue-800 border-blue-200";
      case "In Progress": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Completed": return "bg-green-100 text-green-800 border-green-200";
      case "Cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusArabic = (status: string) => {
    const map: Record<string, string> = {
      Scheduled: "مجدول",
      "In Progress": "جاري الآن",
      Completed: "مكتمل",
      Cancelled: "ملغي",
    };
    return map[status] || status;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/10 overflow-hidden">
                {appointment.patientId?.image ? (
                  <img
                    src={appointment.patientId.image}
                    alt="Patient"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-7 h-7 text-primary" />
                )}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full transition-colors duration-300 ${isOnline ? "bg-green-500" : "bg-gray-300"
                }`}></div>            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">
                {appointment.patientId?.firstName} {appointment.patientId?.lastName}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusStyles(appointment.status)}`}>
                  {getStatusArabic(appointment.status)}
                </span>
                <span className="text-gray-400 text-xs flex items-center gap-1">
                  {appointment.type === "video" ? <Video size={12} /> : appointment.type === "voice" ? <Phone size={12} /> : <Calendar size={12} />}
                  {appointment.type === "video" ? "فيديو" : appointment.type === "voice" ? "صوت" : "عيادة"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1 text-sm border-t md:border-t-0 pt-3 md:pt-0">
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{format(new Date(appointment.appointmentDate), "d MMMM yyyy", { locale: ar })}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="w-4 h-4 text-primary" />
              <span>{appointment.startTime} - {appointment.endTime}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="text-sm">
            <span className="text-gray-500">الرسوم:</span>
            <span className="mr-1 font-bold text-primary">{appointment.fee} ج.م</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-2 text-gray-400 hover:text-primary transition-colors"
              title="التفاصيل"
            >
              {showDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {(appointment.type === "video" || appointment.type === "voice") && appointment.status !== "Completed" && (
              <button
                disabled={isStartingCall}
                onClick={() => onStartCall(appointment.type as "video" | "voice")}
                className="bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {isStartingCall ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  appointment.type === "video" ? <Video size={18} /> : <Phone size={18} />
                )}
                <span className="font-bold text-sm">بدء المكالمة الآن</span>
              </button>
            )}

            {appointment.type === "clinic" && (
              <>
                {appointment.status === "Scheduled" && (
                  <button
                    disabled={isUpdatingStatus}
                    onClick={() => handleStatusUpdate("In Progress")}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all"
                  >
                    بدء الكشف
                  </button>
                )}
                {appointment.status === "In Progress" && (
                  <button
                    disabled={isUpdatingStatus}
                    onClick={() => handleStatusUpdate("Completed")}
                    className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 transition-all"
                  >
                    إنهاء الموعد
                  </button>
                )}
              </>
            )}

            {appointment.status === "In Progress" && (appointment.type !== "clinic") && (
              <button
                disabled={isUpdatingStatus}
                onClick={() => handleStatusUpdate("Completed")}
                className="border border-red-200 text-red-500 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-red-50 transition-all"
              >
                إغلاق الملف
              </button>
            )}
          </div>
        </div>

        {showDetails && (
          <div className="mt-4 p-4 bg-gray-50 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">شكوى المريض:</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              {appointment.symptoms || "لا يوجد وصف مضاف للأعراض."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};