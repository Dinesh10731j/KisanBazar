"use client";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { headerRoutes } from "@/utils/routes";
import KisanBazarLogo from "../../../public/assets/images/KisanBazar_Logo.png";
const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={` text-green-300 py-6 sm:3 md:3  px-5 fixed w-full  z-50 transition-all duration-300 ${
        isSticky ? "shadow-lg backdrop-blur-md bg-white/20" : ""
      }`}
      ref={headerRef}
    >
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo with Linear Gradient */}
        <div className="text-3xl font-extrabold bg-gradient-to-r from-[#FFCDB2] to-[#ffcc00] text-transparent bg-clip-text">
       <Image
          src={KisanBazarLogo}
          alt="KisanBazar Logo"
          width={100}
          height={100}
          className="h-10 w-10 mr-2"  
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8 text-lg">
          {headerRoutes?.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`hover:text-black transition-colors ${
                pathname === link.path ? "text-[#FB8C00] font-semibold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-40 bg-gradient-to-r from-[#ff8a00] to-[#e52e71] transition-transform transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <nav className="flex flex-col items-center pt-16 space-y-6 text-lg">
          {headerRoutes?.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`hover:text-black transition-colors ${
                pathname === link.path ? "text-[#FB8C00] font-semibold" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
