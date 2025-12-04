import { NavLink } from "react-router-dom";
import { NAV_LINKs } from "../constants/navigation";
import { Button } from "../components/ui/Button";

export const MobileNavbar = () => {
  return (
    <div className="lg:hidden border-t border-gray-200 bg-green shadow-md ">
      <div className="px-2 pt-3 pb-4 space-y-2">
        {NAV_LINKs.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            className={({ isActive }) =>
              `block py-3 px-4 text-center rounded-xl font-semibold tracking-wide transition-all duration-300 ${
                isActive
                  ? "text-primary bg-primary/10 shadow-sm scale-[1.02]"
                  : "text-secondary hover:text-primary hover:bg-gray-50"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <div className="px-4 py-5 border-t border-gray-200 space-y-3 bg-white">
        <Button className="w-full justify-center py-3 bg-gray-100 text-secondary hover:bg-gray-200 font-semibold rounded-xl">
          إنشاء حساب
        </Button>
        <Button className="w-full justify-center py-3 bg-primary text-white hover:bg-primary/90 shadow-lg font-semibold rounded-xl">
          تسجيل دخول
        </Button>
      </div>
    </div>
  );
};

export default MobileNavbar;
