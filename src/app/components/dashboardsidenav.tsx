"use client";
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface SidebarProps {
  role: "admin" | "farmer" | "user"; 
}

const DashboardSidebar = ({ role }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = {
    admin: [
      { label: "Dashboard", path: "/admin/dashboard" },
      { label: "Manage Users", path: "/admin/users" },
      { label: "Orders", path: "/admin/orders" },
      { label: "Settings", path: "/admin/settings" },
    ],
    farmer: [
      { label: "My Products", path: "/farmer/products" },
      { label: "Add Product", path: "/farmer/add" },
      { label: "Sales", path: "/farmer/sales" },
      { label: "Profile", path: "/farmer/profile" },
    ],
    user: [
      { label: "Home", path: "/user/home" },
      { label: "Shop", path: "/user/shop" },
      { label: "Cart", path: "/user/cart" },
      { label: "Orders", path: "/user/orders" },
    ],
  };

  // Select the navigation items based on role
  const items = navItems[role] || [];

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
              <a
                href={item.path}
                className="block px-4 py-2 rounded hover:bg-green-300 text-green-900 font-medium"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
