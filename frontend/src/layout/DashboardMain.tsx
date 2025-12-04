import type { DashboardMainProps } from "../types/Dashboard";

const DashboardMain = ({ children }: DashboardMainProps) => {
  return (
    <main className="bg-background h-full p-4">
      <div className="">
        {children}
      </div>
    </main>
  );
};

export default DashboardMain;