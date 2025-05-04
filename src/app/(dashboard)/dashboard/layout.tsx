import { ReactNode } from "react";
import DashboardSidebar from "@/app/components/dashboardsidenav";
import { jwtVerify } from "jose";
import { cookies } from "next/headers"; 
type Role = "admin" | "farmer" | "user";
function isValidRole(role: unknown): role is Role {
  return typeof role === "string" && ["admin", "farmer", "user"].includes(role);
}
// Dashboard layout component
const DashBoardLayout = async ({ children }: { children: ReactNode }) => {
  const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
  let userRole: Role='user';

  try {
    const token = (await cookies()).get("access_token")?.value; 

    if (!token) throw new Error("No token found");

    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (isValidRole(payload.role)) {
      userRole = payload.role;
    }

  } catch (error) {
    console.error("Token verification failed or invalid role:", error);
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role={userRole} />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default DashBoardLayout;
