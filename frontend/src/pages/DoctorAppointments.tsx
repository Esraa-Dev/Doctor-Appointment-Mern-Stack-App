import Loading from "../components/ui/Loading";
import { DoctorAppointmentCard } from "../components/features/dashboard/DoctorAppointmentCard";
import { useGetDoctorAppointments } from "../hooks/appointment/useGetDoctorAppointments";
import type { Appointment } from "../types/types";
import { useMemo, useState } from "react";
import { APPOINTMENTS_TABS } from "../constants/constants";

const DoctorAppointments = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const getStatus = () => {
    if (activeTab === 'upcoming') return ['Scheduled', 'In Progress'];
    if (activeTab === 'completed') return ['Completed'];
    return ['Cancelled'];
  };

  const { data: appointments = [], isLoading } = useGetDoctorAppointments({
    status: getStatus()
  });

  const filteredAppointments = useMemo(() => {
    return {
      upcoming: appointments.filter((appointment: Appointment) =>
        ['Scheduled', 'In Progress'].includes(appointment.status)
      ),
      completed: appointments.filter((appointment: Appointment) =>
        appointment.status === 'Completed'
      ),
      cancelled: appointments.filter((appointment: Appointment) =>
        appointment.status === 'Cancelled'
      ),
    };
  }, [appointments]);

  if (isLoading) return <Loading />;

  return (
    <section className="bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primaryText mb-2">إدارة المواعيد</h1>
        <p className="text-gray-600">إدارة وحجز مواعيد المرضى</p>
      </div>
      <div className="flex border-b border-primaryBorder mb-6">
        {APPOINTMENTS_TABS.map(({ id, label }) => {
          const count = filteredAppointments[id as keyof typeof filteredAppointments].length;
          const isActive = activeTab === id;

          return (
            <button
              key={id}
              onClick={() => setActiveTab(id as 'upcoming' | 'completed' | 'cancelled')}
              className={`flex-1 py-4 text-center font-medium border-b-2 transition-all duration-200 cursor-pointer
              ${isActive ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-primary'}`}
            >
              {label}
              <span className={`mr-2 text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-primary/20' : 'bg-gray-100'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
      <div className="grid gap-4">
        {filteredAppointments[activeTab].length > 0 ? (
          filteredAppointments[activeTab].map((appointment: Appointment) => (
            <DoctorAppointmentCard
              key={appointment._id}
              appointment={appointment}
            />
          ))
        ) : (
          <p className="text-center py-10 text-gray-400">لا توجد مواعيد في هذه القائمة</p>
        )}
      </div>
    </section>
  );
};

export default DoctorAppointments;