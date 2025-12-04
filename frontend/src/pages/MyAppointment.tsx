import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Video, Phone, Download, ChevronLeft } from 'lucide-react';

const MyAppointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const appointments = {
    upcoming: [
      {
        id: 1,
        doctorName: 'د. أحمد محمد',
        specialty: 'أمراض القلب',
        date: '٢٤ ديسمبر ٢٠٢٤',
        time: '١٠:٠٠ صباحاً',
        type: 'حضوري',
        location: 'مستشفى القاهرة الدولي',
        status: 'مؤكد',
        price: 200,
        doctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face'
      },
      {
        id: 2,
        doctorName: 'د. سارة عبدالله',
        specialty: 'طب الأطفال',
        date: '٢٥ ديسمبر ٢٠٢٤',
        time: '٠٢:٠٠ مساءً',
        type: 'اونلاين',
        location: 'استشارة عبر الفيديو',
        status: 'مؤكد',
        price: 150,
        doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face'
      }
    ],
    completed: [
      {
        id: 3,
        doctorName: 'د. محمد علي',
        specialty: 'جراحة العظام',
        date: '١٥ ديسمبر ٢٠٢٤',
        time: '١١:٠٠ صباحاً',
        type: 'حضوري',
        location: 'مستشفى الإسكندرية',
        status: 'مكتمل',
        price: 300,
        doctorImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face'
      }
    ],
    cancelled: [
      {
        id: 4,
        doctorName: 'د. فاطمة حسن',
        specialty: 'طب العيون',
        date: '١٠ ديسمبر ٢٠٢٤',
        time: '٠٤:٠٠ مساءً',
        type: 'حضوري',
        location: 'مستشفى الجيزة',
        status: 'ملغي',
        price: 250,
        doctorImage: 'https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=100&h=100&fit=crop&crop=face'
      }
    ]
  };

  const currentAppointments = appointments[activeTab];

  const getStatusColor = (status) => {
    switch(status) {
      case 'مؤكد': return 'text-green-600 bg-green-100';
      case 'مكتمل': return 'text-blue-600 bg-blue-100';
      case 'ملغي': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <section className="py-12 bg-background min-h-screen">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primaryText mb-3">مواعيدي</h1>
          <p className="text-secondary text-lg">إدارة وحجز مواعيدك الطبية</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-primaryBorder mb-8">
          {[
            { id: 'upcoming', label: 'القادمة', count: appointments.upcoming.length },
            { id: 'completed', label: 'المكتملة', count: appointments.completed.length },
            { id: 'cancelled', label: 'الملغية', count: appointments.cancelled.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 text-center font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-primaryText hover:text-primary'
              }`}
            >
              {tab.label}
              <span className="mr-2 text-sm bg-primary/10 px-2 py-1 rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Appointments List */}
        <div className="space-y-6">
          {currentAppointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-secondary mx-auto mb-4 opacity-50" />
              <p className="text-primaryText text-lg">لا توجد مواعيد {activeTab === 'upcoming' ? 'قادمة' : activeTab === 'completed' ? 'مكتملة' : 'ملغية'}</p>
            </div>
          ) : (
            currentAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-2xl border border-primaryBorder p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Doctor Info */}
                  <div className="flex items-center gap-4 md:w-2/3">
                    <img
                      src={appointment.doctorImage}
                      alt={appointment.doctorName}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="text-right flex-1">
                      <h3 className="text-xl font-bold text-primaryText mb-1">{appointment.doctorName}</h3>
                      <p className="text-primary font-medium mb-3">{appointment.specialty}</p>
                      
                      {/* Appointment Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm text-secondary">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {appointment.type === 'اونلاين' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                          <span>{appointment.location}</span>
                        </div>
                        <div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="md:w-1/3 border-t md:border-t-0 md:border-r md:pr-6 pt-4 md:pt-0 border-primaryBorder">
                    <div className="h-full flex flex-col justify-between">
                      {/* Price */}
                      <div className="text-left mb-4">
                        <div className="text-2xl font-bold text-primary">{appointment.price}</div>
                        <div className="text-secondary text-sm">ج.م / الكشف</div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        {activeTab === 'upcoming' && (
                          <>
                            <button className="w-full py-2 bg-primary text-white rounded-lg text-sm hover:bg-secondary transition-colors">
                              تأكيد الحضور
                            </button>
                            <button className="w-full py-2 border border-primaryBorder text-primaryText rounded-lg text-sm hover:border-primary hover:text-primary transition-colors">
                              إلغاء الموعد
                            </button>
                            {appointment.type === 'اونلاين' && (
                              <button className="w-full py-2 border border-primaryBorder text-primaryText rounded-lg text-sm hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                                <Video className="w-4 h-4" />
                                دخول إلى الاستشارة
                              </button>
                            )}
                          </>
                        )}
                        
                        {activeTab === 'completed' && (
                          <button className="w-full py-2 border border-primaryBorder text-primaryText rounded-lg text-sm hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" />
                            تحميل التقرير
                          </button>
                        )}

                        <button className="w-full py-2 text-secondary text-sm hover:text-primary transition-colors">
                          تفاصيل الموعد
                          <ChevronLeft className="w-4 h-4 inline mr-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Book New Appointment */}
        {activeTab === 'upcoming' && (
          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-colors">
              حجز موعد جديد
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAppointments;