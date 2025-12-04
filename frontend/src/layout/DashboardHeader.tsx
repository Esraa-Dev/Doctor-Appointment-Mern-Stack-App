import type { DashboardHeaderProps } from "../types/Dashboard";
import { SearchHeader } from "./SearchHeader";
import NotificationBtn from "./NotificationBtn";
import { UserProfile } from "./UserProfile";

const DashboardHeader = ({ toggleSidebar }: DashboardHeaderProps) => {
  return (
    <header className=" flex justify-between items-center p-4 shadow-2xl border-b border-primaryBorder h-18">
      <SearchHeader toggleSidebar={toggleSidebar} />
      <div className="flex items-center gap-6">
        <NotificationBtn />
        <UserProfile />
      </div>
    </header>
  );
};

export default DashboardHeader;
