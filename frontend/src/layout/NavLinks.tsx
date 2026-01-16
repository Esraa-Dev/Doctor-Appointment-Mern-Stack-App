import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NAV_LINKS } from "../constants/constants";

export const NavLinks = () => {
  const { t } = useTranslation(['layout']);

  return (
    <ul className="hidden lg:flex items-center space-x-8">
      {NAV_LINKS.map((link) => (
        <li key={link.href}>
          <NavLink
            to={link.href}
            className={({ isActive }) =>
              `text-[15px] font-bold ${isActive ? "text-primary" : "text-primaryText hover:text-secondary"
              }`
            }
          >
            {t(`layout:nav.${link.translationKey}`)}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};