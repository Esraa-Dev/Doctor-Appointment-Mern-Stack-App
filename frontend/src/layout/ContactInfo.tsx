import { MapPin, Phone, Mail } from "lucide-react";
import { useTranslation } from 'react-i18next';

export const ContactInfo = () => {
  const { t, i18n } = useTranslation(['layout']);
  const isRTL = i18n.language === 'ar';

  const ContactData = [
    {
      icon: <MapPin size={18} className="text-primary shrink-0" />,
      text: t('layout:contact.addressDetail'),
    },
    {
      icon: <Phone size={18} className="text-primary shrink-0" />,
      text: "01076645457",
    },
    {
      icon: <Mail size={18} className="text-primary shrink-0" />,
      text: "alshifaclinic@gmail.com",
    },
  ];

  return (
    <div className={`order-2 lg:order-2 ${isRTL ? 'text-right' : 'text-left'}`}>
      <h3 className="text-lg font-semibold mb-4">{t('layout:footer.contactUs')}</h3>
      <address className="not-italic text-gray-300 space-y-2">
        {ContactData.map((item, index) => (
          <div
            key={index}
            className="flex gap-2 hover:text-primary transition-colors duration-200"
          >
            {item.icon}
            <p>{item.text}</p>
          </div>
        ))}
      </address>
    </div>
  );
};