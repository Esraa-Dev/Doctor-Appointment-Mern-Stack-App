import { useState } from "react";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Logo } from "../components/ui/Logo";
import { MobileNavbar } from "./MobileNavbar";
import { NavLinks } from "./NavLinks";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../hooks/auth/useGetCurrentUser";
import { useLogout } from "../hooks/auth/useLogout";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: user, isLoading } = useGetCurrentUser();
  const { mutate } = useLogout()
  console.log(user);
  return (
    <nav className={`py-6 relative shadow-md ${isMenuOpen ? "bg-background" : "bg-white"}`}>
      <div className="flex-center justify-between container flex-wrap h-10">
        <Logo />
        <NavLinks />
        {!isLoading && user ? (
          <div className="relative hidden lg:flex items-center gap-2 h-full">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 cursor-pointer px-2 py-1 transition-colors"
            >
              <img
                src={user.image}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border border-primary/45"
              />
              <span className="font-medium text-sm text-primaryText">{user.firstName}</span>
              <ChevronDown size={16} className="font-medium text-primary" />
            </button>

            {isDropdownOpen && (
              <div className="absolute w-35 right-0 top-[calc(100%+10px)] bg-white border border-primaryBorder rounded-sm shadow-2xl z-50">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/profile");
                  }}
                  className="flex items-center gap-2 text-xs p-4 font-medium text-primaryText border-b border-primary/50 w-full text-right cursor-pointer"
                >
                  <User size={16} className="text-primary" />
                  الملف الشخصي
                </button>
                <button
                  onClick={() => {
                    mutate()
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 text-xs p-4 font-medium text-primaryText w-full text-right cursor-pointer"
                >
                  <LogOut size={16} className="text-primary" />
                  تسجيل خروج
                </button>
              </div>
            )}
          </div>
        ) : (
          <Button className="hidden lg:flex" onClick={() => navigate("/login")}>
            تسجيل دخول
          </Button>
        )}
        <button
          aria-label="Toggle Menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex lg:hidden bg-secondary hover:bg-secondary/70 text-white w-9 h-9 cursor-pointer justify-center items-center rounded-sm border-white"
        >
          {!isMenuOpen ? <Menu size={18} /> : <X size={18} />}
        </button>
      </div>

      {isMenuOpen && <MobileNavbar isOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}
    </nav>
  );
};
