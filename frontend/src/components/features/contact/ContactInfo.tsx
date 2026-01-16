import { useTranslation } from 'react-i18next';
import { CONTACT_INFO } from '../../../constants/constants';

export const ContactInfo = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className={`order-2 lg:order-2 ${isRTL ? 'text-right!' : 'text-left!'}`}>
      <h3 className="text-lg font-semibold mb-4">{t('footer.contactUs')}</h3>
      <address className="not-italic text-gray-300 space-y-2">
        {CONTACT_INFO.map((item, index) => (
          <div
            key={index}
            className="flex gap-2 hover:text-primary transition-colors duration-200"
          >
            <item.icon size={18} className="text-primary shrink-0" />
            <div>
              <p className="font-medium">{t(item.textKey)}</p>
              <p className="text-sm">
                {item.detailsKey ? t(item.detailsKey) : item.details}
              </p>
            </div>
          </div>
        ))}
      </address>
    </div>
  );
};