
import { ReactNode } from "react";
import DashboardSidebar from "@/app/components/dashboardsidenav";
import { UseUserRole } from "@/hooks/useUserRole";
const DashBoardLayout = async ({ children }: { children: ReactNode }) => {

  const role = UseUserRole();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role={role} />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default DashBoardLayout;
