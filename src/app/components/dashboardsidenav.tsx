"use client";
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dashboardRoutes } from '@/utils/routes';
import { SidebarProps } from '@/utils/types';
const DashboardSidebar = ({ role }: SidebarProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const items = dashboardRoutes[role] || [];

  return (
    <div>
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden p-4 flex justify-between items-center bg-green-600 text-white">
        <h1 className="text-xl font-bold">KisanBazaar</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed z-30 top-0 left-0 h-full bg-green-100 shadow-md transition-all duration-300
        ${isOpen ? "w-64" : "w-0"} md:w-64 md:static`}
      >
        <div className="p-4 font-bold text-xl text-green-800 hidden md:block">
          KisanBazaar
        </div>

        {/* Sidebar Links */}
        <ul className="p-4 space-y-2">
          {items.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                
                className={` ${pathname === item.path ? 'bg-green-300 text-green-900' : 'hover:bg-green-200 text-green-900'} block px-4 py-2 rounded hover:bg-green-300 text-green-900 font-medium`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
