import { useTranslation } from "react-i18next";

export function FooterCopyright() {
    const { t } = useTranslation(['layout']);
    const currentYear = new Date().getFullYear();

    return (
        <section className="border-t border-primaryBorder mt-8 pt-6 text-center text-white flex-1 w-full">
            <p className="flex-center gap-1">
                {t('layout:footer.copyright', { year: currentYear })}
            </p>
        </section>
    );
}