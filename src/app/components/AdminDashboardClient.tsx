
'use client';
import { UseUserRole } from "@/hooks/useUserRole";

const AdminDashboardClient = () => {
  const role = UseUserRole(); 

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-2">You are logged in as: {role}</p>
    </div>
  );
};

export default AdminDashboardClient;
