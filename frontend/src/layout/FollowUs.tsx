import { useTranslation } from 'react-i18next';
import { SOCIAL_LINKS } from '../constants/constants';

export const FollowUs = () => {
  const { t, i18n } = useTranslation(['layout']);
  const isRTL = i18n.language === 'ar';

  return (
    <div className={`order-4 lg:order-3 ${isRTL ? 'text-right' : 'text-left'}`}>
      <h3 className="text-lg font-semibold mb-4">{t('layout:footer.followUs')}</h3>
      <div className="flex gap-4">
        {SOCIAL_LINKS.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-secondary rounded-full flex-center hover:bg-secondary/80 transition-colors"
              aria-label={t('layout:footer.socialLink')}
            >
              <Icon className="w-4 h-4 text-white" />
            </a>
          );
        })}
      </div>
    </div>
  );
};