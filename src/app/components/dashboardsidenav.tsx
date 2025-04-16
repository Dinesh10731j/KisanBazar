"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardRoutes } from "@/utils/routes";
import { SidebarProps } from "@/utils/types";
import { Menu, X } from "lucide-react";
const DashboardSidenav: React.FC<SidebarProps> = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const clickOutSideRef = useRef<HTMLDivElement>(null)
  const items = dashboardRoutes[role] || [];
  const toggleSidebar = () => setIsOpen(!isOpen);


  useEffect(() => {

    const controller = new AbortController();
    const signal = controller.signal;

    const handleClickoutside = (event: MouseEvent) => {
      if (clickOutSideRef.current &&
        !clickOutSideRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }


    document.addEventListener("mousedown", handleClickoutside, { signal })


    return () => controller.abort();

  }, [])

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        ref={clickOutSideRef}
        className={`${isOpen ? "w-64" : "w-20"
          } bg-[#1E88E5] text-gray-100 min-h-screen transition-all duration-300`}

      >

        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <Link href={"/"}>
            <h1 className="text-xl font-bold">{isOpen ? "KisanBazaar" : "KB"}</h1>
          </Link>
          <button onClick={toggleSidebar} className="text-white cursor-pointer">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="mt-5 space-y-4">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center space-x-3 px-4 py-2 hover:bg-gray-700 transition rounded-md ${pathname === item.path ? "bg-gray-700" : ""
                }`}
            >
              {React.createElement(item.icon, { size: 20 })}
              {isOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>


    </div>
  );
};

export default DashboardSidenav;
