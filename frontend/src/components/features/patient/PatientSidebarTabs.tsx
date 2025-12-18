import type { PatientSidebarTabsProps } from "../../../types/types";

export const PatientSidebarTabs = ({
  tabs,
  activeTab,
  setActiveTab,
}: PatientSidebarTabsProps) => {
  return (
    <div>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer
              ${activeTab === tab.id
                ? "bg-primary/80 text-white"
                : "text-primaryText hover:bg-primaryBorder"
              }
          `}
          >
            <Icon className="w-5 h-5" />
            <span className=" text-sm font-semibold">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
