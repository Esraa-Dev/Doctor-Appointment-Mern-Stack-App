import { User, Mail, Phone, Calendar, MapPin, Edit, Shield, History, Heart, Settings } from "lucide-react";
import { useState } from "react";

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  
  const userData = {
    name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "+1234567890",
    birthDate: "١٥ يناير ١٩٩٠",
    address: "القاهرة، مصر",
    gender: "ذكر",
    bloodType: "O+"
  };

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "د. سارة عبدالله",
      specialty: "طب الأطفال",
      date: "١٥ يناير ٢٠٢٤",
      time: "١٠:٠٠ ص",
      status: "مؤكد"
    },
    {
      id: 2,
      doctor: "د. محمد علي",
      specialty: "العظام",
      date: "١٨ يناير ٢٠٢٤",
      time: "٠٢:٠٠ م",
      status: "قيد الانتظار"
    }
  ];

  const medicalHistory = [
    {
      id: 1,
      date: "١٠ يناير ٢٠٢٤",
      doctor: "د. أحمد محمد",
      diagnosis: "ضغط الدم",
      prescription: "أدوية ضغط"
    },
    {
      id: 2,
      date: "٥ ديسمبر ٢٠٢٣",
      doctor: "د. فاطمة حسن",
      diagnosis: "تحاليل عامة",
      prescription: "مكملات غذائية"
    }
  ];

  const tabs = [
    { id: 'personal', label: 'المعلومات الشخصية', icon: <User className="w-4 h-4" /> },
    { id: 'medical', label: 'السجل الطبي', icon: <Heart className="w-4 h-4" /> },
    { id: 'appointments', label: 'المواعيد', icon: <Calendar className="w-4 h-4" /> },
    { id: 'settings', label: 'الإعدادات', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-primaryBorder p-6 sticky top-6">
              {/* User Avatar */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary text-3xl font-bold mx-auto mb-4">
                  {userData.name.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-primaryText">{userData.name}</h2>
                <p className="text-secondary text-sm">عضو منذ ٢٠٢٣</p>
              </div>

              {/* Tabs */}
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-primaryText hover:bg-primaryBorder'
                    }`}
                  >
                    {tab.icon}
                    <span className="flex-1">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-8 pt-8 border-t border-primaryBorder">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{upcomingAppointments.length}</div>
                    <div className="text-sm text-secondary">مواعيد قادمة</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{medicalHistory.length}</div>
                    <div className="text-sm text-secondary">فحوصات</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Personal Info */}
            {activeTab === 'personal' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-primaryText">المعلومات الشخصية</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-secondary transition-colors">
                    <Edit className="w-4 h-4" />
                    تعديل
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-primaryBorder p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <User className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-secondary">الاسم الكامل</div>
                        <div className="font-medium text-primaryText">{userData.name}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-secondary">البريد الإلكتروني</div>
                        <div className="font-medium text-primaryText">{userData.email}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-secondary">رقم الهاتف</div>
                        <div className="font-medium text-primaryText">{userData.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-secondary">تاريخ الميلاد</div>
                        <div className="font-medium text-primaryText">{userData.birthDate}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-secondary">العنوان</div>
                        <div className="font-medium text-primaryText">{userData.address}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Shield className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-secondary">فصيلة الدم</div>
                        <div className="font-medium text-primaryText">{userData.bloodType}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appointments */}
            {activeTab === 'appointments' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-primaryText">المواعيد القادمة</h2>
                
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="bg-white rounded-2xl border border-primaryBorder p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-right">
                          <h3 className="text-xl font-bold text-primaryText mb-2">{appointment.doctor}</h3>
                          <p className="text-primary">{appointment.specialty}</p>
                          <div className="flex items-center gap-4 mt-3 text-secondary">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <History className="w-4 h-4" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <span className={`px-4 py-2 rounded-xl text-center ${
                            appointment.status === "مؤكد" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {appointment.status}
                          </span>
                          <button className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-secondary transition-colors">
                            تفاصيل
                          </button>
                          <button className="px-4 py-2 border border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-colors">
                            إلغاء
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Medical History */}
            {activeTab === 'medical' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-primaryText">السجل الطبي</h2>
                
                <div className="bg-white rounded-2xl border border-primaryBorder overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-primaryBorder">
                        <tr>
                          <th className="text-right p-4">التاريخ</th>
                          <th className="text-right p-4">الطبيب</th>
                          <th className="text-right p-4">التشخيص</th>
                          <th className="text-right p-4">الوصفة</th>
                          <th className="text-right p-4">الإجراء</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medicalHistory.map((record) => (
                          <tr key={record.id} className="border-b border-primaryBorder hover:bg-background">
                            <td className="p-4 text-primaryText">{record.date}</td>
                            <td className="p-4 text-primaryText">{record.doctor}</td>
                            <td className="p-4 text-primaryText">{record.diagnosis}</td>
                            <td className="p-4 text-primaryText">{record.prescription}</td>
                            <td className="p-4">
                              <button className="px-3 py-1 bg-primary text-white rounded-lg text-sm hover:bg-secondary">
                                عرض
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-primaryText">الإعدادات</h2>
                
                <div className="bg-white rounded-2xl border border-primaryBorder p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-primaryText">الإشعارات</div>
                        <div className="text-secondary text-sm">تلقي إشعارات عن المواعيد والتحديثات</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-primaryText">التحديثات الطبية</div>
                        <div className="text-secondary text-sm">تحديثات عن المقالات والنصائح الطبية</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-primaryText">الخصوصية</div>
                        <div className="text-secondary text-sm">جعل الملف الطبي خاص</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="pt-6 border-t border-primaryBorder">
                      <button className="px-6 py-3 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200 transition-colors">
                        حذف الحساب
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;