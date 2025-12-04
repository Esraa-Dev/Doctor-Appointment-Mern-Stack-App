import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "الهاتف",
      details: "+123 456 7890",
      description: "24/7 متاح"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "البريد الإلكتروني",
      details: "support@medibook.com",
      description: "رد خلال 24 ساعة"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "المكتب الرئيسي",
      details: "القاهرة، مصر",
      description: "من الأحد إلى الخميس"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "ساعات العمل",
      details: "9 ص - 5 م",
      description: "من الأحد إلى الخميس"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-6">اتصل بنا</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            نحن هنا لمساعدتك. تواصل معنا للحصول على دعم فوري
          </p>
        </div>
      </section>

      <div className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl border border-primaryBorder">
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold text-primaryText">أرسل رسالة</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primaryText mb-2">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-primaryBorder rounded-xl focus:border-primary focus:outline-none text-right"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primaryText mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-primaryBorder rounded-xl focus:border-primary focus:outline-none text-right"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primaryText mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-primaryBorder rounded-xl focus:border-primary focus:outline-none text-right"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primaryText mb-2">
                    الموضوع
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 border border-primaryBorder rounded-xl focus:border-primary focus:outline-none text-right"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primaryText mb-2">
                  الرسالة
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full p-3 border border-primaryBorder rounded-xl focus:border-primary focus:outline-none text-right resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-colors"
              >
                <Send className="w-5 h-5" />
                إرسال الرسالة
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-primaryText mb-4">معلومات التواصل</h2>
              <p className="text-secondary text-lg">
                لا تتردد في التواصل معنا لأي استفسار أو مساعدة
              </p>
            </div>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div key={index} className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-primaryBorder">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    {method.icon}
                  </div>
                  <div className="text-right flex-1">
                    <h3 className="font-bold text-primaryText text-lg">{method.title}</h3>
                    <p className="text-primaryText">{method.details}</p>
                    <p className="text-secondary text-sm">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div className="mt-12 bg-white p-6 rounded-2xl border border-primaryBorder">
              <h3 className="text-xl font-bold text-primaryText mb-4">أسئلة شائعة</h3>
              <div className="space-y-4">
                <div className="border-b border-primaryBorder pb-4">
                  <div className="font-medium text-primaryText mb-1">كيف يمكنني حجز موعد؟</div>
                  <div className="text-secondary text-sm">
                    يمكنك حجز موعد من خلال الموقع أو التطبيق بخطوات بسيطة
                  </div>
                </div>
                <div className="border-b border-primaryBorder pb-4">
                  <div className="font-medium text-primaryText mb-1">هل الخدمة متاحة 24/7؟</div>
                  <div className="text-secondary text-sm">
                    نعم، خدمة الحجز والدعم الفني متاحة على مدار الساعة
                  </div>
                </div>
                <div>
                  <div className="font-medium text-primaryText mb-1">كيف يمكنني إلغاء موعد؟</div>
                  <div className="text-secondary text-sm">
                    يمكنك إلغاء الموعد من صفحة مواعيدي قبل 24 ساعة من الموعد
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;