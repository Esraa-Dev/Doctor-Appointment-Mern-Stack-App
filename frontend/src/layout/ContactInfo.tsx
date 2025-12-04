import { MapPin, Phone, Mail } from "lucide-react";

const ContactData = [
  {
    icon: <MapPin size={18} className="text-primary flex-shrink-0" />,
    text: "مدينة نصر، شارع مكرم عبيد، برج الأطباء، الدور الثالث",
  },
  {
    icon: <Phone size={18} className="text-primary flex-shrink-0" />,
    text: "01076645457",
  },
  {
    icon: <Mail size={18} className="text-primary flex-shrink-0" />,
    text: "alshifaclinic@gmail.com",
  },
];

export const ContactInfo = () => {
  return (
    <div className="order-2 lg:order-2">
      <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
      <address className="not-italic text-gray-300 space-y-2 ">
        {ContactData.map((item, index) => (
          <div
            key={index}
            className={`flex gap-2 hover:text-primary transition-colors duration-200`}
          >
            {item.icon}
            <p>{item.text}</p>
          </div>
        ))}
      </address>
    </div>
  );
};
