import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { NAV_LINKS } from "../constants/constants";

export const QuickLinks = () => {
  const { t, i18n } = useTranslation(['layout']);
  const isRTL = i18n.language === 'ar';

  return (
    <div className={`order-3 lg:order-3 ${isRTL ? 'text-right' : 'text-left'}`}>
      <h3 className="text-lg font-semibold mb-4">{t('layout:footer.quickLinks')}</h3>
      <ul className="flex flex-col gap-2">
        {NAV_LINKS.map((link, index) => (
          <li key={index}>
            <Link
              to={link.href}
              className={`text-gray-300 hover:text-primary transition-colors duration-200 block ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {t(`layout:nav.${link.translationKey}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};