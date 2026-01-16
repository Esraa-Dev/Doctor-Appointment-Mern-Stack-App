import { Logo } from '../components/ui/Logo'
import { useTranslation } from 'react-i18next';

export const BrandInfo = () => {
    const { t, i18n } = useTranslation('layout');
    const isRTL = i18n.language === 'ar';

    return (
        <div className={isRTL ? 'text-right' : 'text-left'}>
            <Logo />
            <p className="text-gray-300 text-sm leading-6">
                {t('layout:clinic.description')}
            </p>
        </div>
    )
}