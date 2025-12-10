import { NavLink, useNavigate } from "react-router-dom";
import { NAV_LINKs } from "../constants/navigation";
import { Button } from "../components/ui/Button";
import type { MobileNavbarProps } from "../types/types";

export const MobileNavbar = ({ isOpen }: MobileNavbarProps) => {
  const navigate = useNavigate()
  return (
    <div
      className={`lg:hidden pb-8 absolute shadow-2xl z-50 w-full left-0 right-0 top-full border-b border-primaryBorder bg-background overflow-hidden transition-all duration-1000 ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
    >
      <div className="border-t border-primaryBorder pt-4 transition-opacity duration-300">
        {NAV_LINKs.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            className={({ isActive }) =>
              `block py-3 px-4 text-center rounded-xl font-semibold tracking-wide transition-all duration-300 ${isActive ? "text-primary" : "text-secondary hover:text-primary"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <div className="flex-center flex-col gap-2 container">
        <Button className="py-3 px-3 sm:px-20 w-full sm:w-fit" onClick={() => navigate("/login")}>تسجيل دخول</Button>
        <Button className="py-3 px-3 sm:px-20 w-full sm:w-fit bg-secondary hover:bg-secondary/80" onClick={() => navigate("/register")}>
          إنشاء حساب
        </Button>
      </div>
    </div>
  );
};

export default MobileNavbar;
