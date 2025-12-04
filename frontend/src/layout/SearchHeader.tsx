import { Menu, Search } from "lucide-react";
import type { DashboardHeaderProps } from "../types/Dashboard";

export const SearchHeader = ({ toggleSidebar }: DashboardHeaderProps) => {
  return (
    <div className="flex gap-2">
      <button
        aria-label="Toggle Menu"
        onClick={toggleSidebar}
        className="flex bg-primary text-white w-9 h-9 cursor-pointer justify-center items-center rounded-full border-white"
      >
        <Menu size={16} />
      </button>
      <div className="relative w-72 rounded-4xl flex items-center px-2 gap-1 text-primaryText border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
        <Search size={16} />
        <input
          type="text"
          placeholder="ابحث عن مريض، طبيب، موعد..."
          className="flex-1 outline-none bg-transparent text-sm px-2 py-1"
        />
      </div>
    </div>
  );
};
