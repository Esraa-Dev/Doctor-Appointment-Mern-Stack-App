export const changeLanguageUtils = (i18n: any) => {
  const newLang = i18n.language === "en" ? "ar" : "en";
  i18n.changeLanguage(newLang);
};
