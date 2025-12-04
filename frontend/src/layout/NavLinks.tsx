import { NavLink } from "react-router-dom";
import { NAV_LINKs } from "../constants/navigation";

export const NavLinks = () => {
  return (
    <ul className="hidden lg:flex items-center space-x-8">
      {NAV_LINKs.map((link) => (
        <li key={link.href}>
          <NavLink
            to={link.href}
            className={({ isActive }) =>
              `text-[15px] font-bold ${
                isActive ? "text-primary" : "text-primaryText hover:text-secondary"
              }`
            }
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
