import React, { useState } from 'react';
import { Calendar, Clock, Phone, User, Video } from 'lucide-react';
import type { AppointmentCardProps } from '../../../types/types';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useUpdateAppointmentStatus } from '../../../hooks/appointment/useUpdateAppointmentStatus';



export const DoctorAppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showCallOptions, setShowCallOptions] = useState(false);
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdateAppointmentStatus();

  const handleCallClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (appointment.type === 'video' || appointment.type === 'voice') {
      setShowCallOptions(!showCallOptions);
    }
  };


  const handleStatusUpdate = (newStatus: string) => {
    updateStatus({
      appointmentId: appointment._id,
      status: newStatus
    });
  };

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

  const formatDate = (dateInput: string | Date) => {
    try {
      const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        console.warn('Invalid date:', dateInput);
        return 'تاريخ غير صالح';
      }

      return format(date, 'd MMMM yyyy', { locale: ar });
    } catch (error) {
      console.error('Date formatting error:', error, 'Input:', dateInput);
      return typeof dateInput === 'string' ? dateInput : 'تاريخ غير صالح';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-4 flex-wrap">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              {appointment.patientId.image ? (
                <img
                  src={appointment.patientId.image}
                  alt={`${appointment.patientId.firstName} ${appointment.patientId.lastName}`}
                  className="w-12 h-12 rounded-xl object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-primary" />
              )}
            </div>

            <div>
              <h3 className="text-lg font-bold text-primaryText mb-1">
                {appointment.patientId.firstName} {appointment.patientId.lastName}
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
                {formatDate(appointment.appointmentDate)} {/* Now works with string | Date */}
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

            {(appointment.status === 'Scheduled' || appointment.status === 'In Progress') && (
              <div className="relative">
                <button
                  onClick={handleCallClick}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  <span>اتصال</span>
                </button>

                {showCallOptions && (
                  <div
                    className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl border p-2 min-w-[200px] z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-2 py-1 border-b mb-2">
                      <p className="text-sm font-medium text-gray-700">خيارات الاتصال</p>
                    </div>

                    {appointment.type === 'video' && (
                      <button
                        className="w-full text-right px-4 py-2 hover:bg-gray-100 rounded flex items-center justify-between disabled:opacity-50"
                      >
                        <Video className="w-4 h-4 text-blue-600" />
                        <span className="flex-1 text-right mr-2">مكالمة فيديو</span>
                      </button>
                    )}

                    {(appointment.type === 'video' || appointment.type === 'voice') && (
                      <button
                        className="w-full text-right px-4 py-2 hover:bg-gray-100 rounded flex items-center justify-between disabled:opacity-50"
                      >
                        <Phone className="w-4 h-4 text-green-600" />
                        <span className="flex-1 text-right mr-2">مكالمة صوتية</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {appointment.type !== 'video' && appointment.type !== 'voice' && appointment.status === 'Scheduled' && (
              <button
                disabled={isUpdatingStatus}
                onClick={() => handleStatusUpdate("In Progress")}
                className="text-primary font-medium hover:underline cursor-pointer disabled:opacity-50"
              >
                {isUpdatingStatus ? "جاري البدء..." : "بدء الموعد"}
              </button>
            )}

            {appointment.status === 'In Progress' && appointment.type !== 'video' && appointment.type !== 'voice' && (
              <button
                disabled={isUpdatingStatus}
                onClick={() => handleStatusUpdate("Completed")}
                className="text-red-500 font-medium hover:underline cursor-pointer disabled:opacity-50"
              >
                {isUpdatingStatus ? "جاري الإنهاء..." : "إنهاء الموعد"}
              </button>
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