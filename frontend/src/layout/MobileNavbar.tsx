import { NavLink, useNavigate } from "react-router-dom";
import { NAV_LINKs } from "../constants/navigation";
import { Button } from "../components/ui/Button";
import type { MobileNavbarProps } from "../types/types";

export const MobileNavbar = ({
  isOpen,
  setIsMenuOpen,
}: MobileNavbarProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={`[clip-path:polygon(0_0,100%_0,100%_50%,100%_100%,100%_100%,0_85%)] lg:hidden pb-20 absolute shadow-2xl z-50 w-full left-0 right-0 top-full  bg-white overflow-hidden transition-all duration-1000 `}
    >
      <div className="absolute -top-30 -right-30 w-70 h-70 rounded-full bg-secondary/10 hidden sm:block"></div>
      <div className="absolute -bottom-20 -left-25 w-70 h-70 rounded-full bg-primary/10 hidden sm:block"></div>

      <div className="border-t border-primaryBorder pt-4 transition-opacity duration-300">
        {NAV_LINKs.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            onClick={() => {
              setIsMenuOpen(false);
            }}
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
        <Button
          className="py-3 px-3 sm:px-20 w-full sm:w-fit"
          onClick={() => {
            navigate("/login");
            setIsMenuOpen(false);
          }}
        >
          تسجيل دخول
        </Button>
        <Button
          className="py-3 px-3 sm:px-20 w-full sm:w-fit bg-secondary hover:bg-secondary/80"
          onClick={() => {
            navigate("/register");
            setIsMenuOpen(false);
          }}
        >
          إنشاء حساب
        </Button>
      </div>
    </div>
  );
};

export default MobileNavbar;
