import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useGetPatientAppointments } from '../hooks/appointment/useGetPatientAppointments';
import type { Appointment } from '../types/types';
import { PatientAppointmentCard } from '../components/features/patient/PatientAppointmentCard';

const PatientAppointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const { data: appointments = [], isLoading } = useGetPatientAppointments();

  const filteredAppointments = appointments.filter((appointment:Appointment) => {
    if (activeTab === 'upcoming') {
      return appointment.status === 'Scheduled' || appointment.status === 'In Progress';
    }
    if (activeTab === 'completed') {
      return appointment.status === 'Completed';
    }
    if (activeTab === 'cancelled') {
      return appointment.status === 'Cancelled';
    }
    return true;
  });

  const getTabCount = (tab: string) => {
    if (tab === 'upcoming') {
      return appointments.filter((appointment:Appointment) => appointment.status === 'Scheduled' || appointment.status === 'In Progress').length;
    }
    if (tab === 'completed') {
      return appointments.filter((appointment:Appointment)=> appointment.status === 'Completed').length;
    }
    if (tab === 'cancelled') {
      return appointments.filter((appointment:Appointment)=> appointment.status === 'Cancelled').length;
    }
    return 0;
  };

  if (isLoading) {
    return (
      <div className="py-12 bg-background min-h-screen">
        <div className="container">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-background min-h-screen">
      <div className="container">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primaryText mb-3">مواعيدي</h1>
          <p className="text-secondary text-lg">إدارة وحجز مواعيدك الطبية</p>
        </div>

        <div className="flex border-b border-primaryBorder mb-8">
          {['upcoming', 'completed', 'cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-center font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-primaryText hover:text-primary'
              }`}
            >
              {tab === 'upcoming' && 'القادمة'}
              {tab === 'completed' && 'المكتملة'}
              {tab === 'cancelled' && 'الملغية'}
              <span className="mr-2 text-sm bg-primary/10 px-2 py-1 rounded-full">
                {getTabCount(tab)}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-secondary mx-auto mb-4 opacity-50" />
              <p className="text-primaryText text-lg">
                {activeTab === 'upcoming' && 'لا توجد مواعيد قادمة'}
                {activeTab === 'completed' && 'لا توجد مواعيد مكتملة'}
                {activeTab === 'cancelled' && 'لا توجد مواعيد ملغية'}
              </p>
            </div>
          ) : (
            filteredAppointments.map((appointment: Appointment) => (
              <PatientAppointmentCard
                key={appointment._id}
                appointment={appointment}
              />
            ))
          )}
        </div>

        {activeTab === 'upcoming' && (
          <div className="text-center mt-8">
            <button 
              onClick={() => window.location.href = '/doctor-list'}
              className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-colors"
            >
              حجز موعد جديد
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PatientAppointments;