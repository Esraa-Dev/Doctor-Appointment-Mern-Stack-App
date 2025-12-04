import {Logo} from "../components/ui/Logo";
import type { DashboardSidebarProps } from "../types/Dashboard";
import { SidebarMenu } from "./SidebarMenu";

const DashboardSidebar = ({ sidebarOpen }: DashboardSidebarProps) => {
  return (
    <aside
      className={`
           h-screen transition-all duration-300 overflow-hidden shadow-md bg-white border-l border-primaryBorder
          ${sidebarOpen ? "w-64 lg:w-64" : "w-0 lg:w-0"} 
        `}
    >
      <div className="flex justify-center p-4 border-b border-primaryBorder h-18">
        <Logo />
      </div>

      <SidebarMenu />
    </aside>
  );
};

export default DashboardSidebar;
