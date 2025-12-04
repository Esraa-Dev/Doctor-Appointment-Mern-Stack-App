import { Calendar, Clock, MapPin, User, Video, Phone } from 'lucide-react';

const Appointment = () => {
  const appointments = [
    {
      id: 1,
      doctorName: 'د. أحمد محمد',
      specialty: 'أمراض القلب',
      date: 'الإثنين، 24 ديسمبر 2024',
      time: '10:00 صباحاً',
      type: 'زيارة حضورية',
      location: 'مستشفى القاهرة',
      status: 'قادم',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: 2,
      doctorName: 'د. سارة عبدالله',
      specialty: 'طب الأطفال',
      date: 'الثلاثاء، 25 ديسمبر 2024',
      time: '02:00 مساءً',
      type: 'استشارة اونلاين',
      location: 'استشارة عن بعد',
      status: 'قادم',
      icon: <Video className="w-5 h-5" />
    },
    {
      id: 3,
      doctorName: 'د. محمد علي',
      specialty: 'جراحة العظام',
      date: 'الأربعاء، 26 ديسمبر 2024',
      time: '11:00 صباحاً',
      type: 'مكالمة هاتفية',
      location: 'مكالمة هاتفية',
      status: 'مؤكد',
      icon: <Phone className="w-5 h-5" />
    },
    {
      id: 4,
      doctorName: 'د. فاطمة حسن',
      specialty: 'طب العيون',
      date: 'الخميس، 27 ديسمبر 2024',
      time: '04:00 مساءً',
      type: 'زيارة حضورية',
      location: 'مستشفى الجيزة',
      status: 'مكتمل',
      icon: <Calendar className="w-5 h-5" />
    }
  ];

  const statusColors = {
    'قادم': 'bg-primary text-white',
    'مؤكد': 'bg-secondary text-white',
    'مكتمل': 'bg-green-500 text-white',
    'ملغي': 'bg-red-500 text-white'
  };

  return (
    <section className="py-16 bg-background">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primaryText mb-3">مواعيدي</h2>
          <p className="text-secondary text-lg">إدارة وحجز مواعيدك الطبية</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-primaryBorder text-center">
            <div className="text-2xl font-bold text-primary">3</div>
            <div className="text-secondary text-sm">مواعيد قادمة</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-primaryBorder text-center">
            <div className="text-2xl font-bold text-primary">1</div>
            <div className="text-secondary text-sm">مواعيد مكتملة</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-primaryBorder text-center">
            <div className="text-2xl font-bold text-primary">15</div>
            <div className="text-secondary text-sm">موعد مجدد</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-primaryBorder text-center">
            <div className="text-2xl font-bold text-primary">0</div>
            <div className="text-secondary text-sm">مواعيد ملغية</div>
          </div>
        </div>

        {/* Appointment Cards */}
        <div className="space-y-6">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-2xl border border-primaryBorder p-6 hover:border-primary transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Left: Doctor Info */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    {appointment.icon}
                  </div>
                  <div className="text-right">
                    <h3 className="text-lg font-bold text-primaryText mb-1">{appointment.doctorName}</h3>
                    <p className="text-primary font-medium mb-2">{appointment.specialty}</p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-secondary">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{appointment.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Status Badge */}
                  <span className={`px-4 py-2 rounded-xl text-sm font-medium ${statusColors[appointment.status]}`}>
                    {appointment.status}
                  </span>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-secondary transition-colors">
                      تفاصيل
                    </button>
                    <button className="px-4 py-2 border border-primaryBorder text-primaryText rounded-lg text-sm hover:border-primary hover:text-primary transition-colors">
                      إلغاء
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <button className="px-8 py-3 bg-primary text-white rounded-xl font-medium hover:bg-secondary transition-colors">
            حجز موعد جديد
          </button>
        </div>
      </div>
    </section>
  );
};

export default Appointment;