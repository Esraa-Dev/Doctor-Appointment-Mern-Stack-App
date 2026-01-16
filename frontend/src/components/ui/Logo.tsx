import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logoImage from "../../assets/logo.png";

export const Logo = () => {
    const { t } = useTranslation('layout');
    
    return (
        <Link to="/" className="flex items-center gap-2 ">
            <img src={logoImage} alt="Al Shifa Clinic Logo" className="w-10" />
            <h1 className="text-2xl font-bold text-secondary whitespace-nowrap">
                {t('layout:clinic.name')} <span className="me-1 text-primary">{t('layout:clinic.subname')}</span>
            </h1>
        </Link>
    );
};