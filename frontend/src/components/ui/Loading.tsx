import { useTranslation } from "react-i18next";

const Loading = () => {
    const { t } = useTranslation("common");

    return (
        <div className="flex flex-col items-center justify-center py-12 bg-background h-screen">
            <div className="relative">
                <div className="h-14 w-14 rounded-full border-4 border-primaryBorder"></div>
                <div className="absolute top-0 left-0 h-14 w-14 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
            <p className="mt-4 text-primaryText text-sm font-medium animate-pulse">
                {t('common:loading')}
            </p>
        </div>
    );
};

export default Loading;