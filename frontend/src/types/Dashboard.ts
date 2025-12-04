export interface DashboardHeaderProps {
  toggleSidebar: () => void;
}
export interface DashboardSidebarProps {
  sidebarOpen: boolean;
}
export interface DashboardMainProps {
  children: React.ReactNode;
}
