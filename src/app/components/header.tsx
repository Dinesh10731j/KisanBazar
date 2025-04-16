"use client";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { headerRoutes } from "@/utils/routes";
import KisanBazarLogo from "../../../public/assets/images/KisanBazar_Logo.png";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const items = useSelector((state:RootState)=>state.cart.cart);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll,{signal});
    return () =>controller.abort();
  }, []);

  return (
    <header
      className={`text-green-300 py-6 px-5 fixed w-full z-50 transition-all duration-300 ${
        isSticky ? "shadow-lg backdrop-blur-md bg-white/20" : ""
      }`}
      ref={headerRef}
    >
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
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
        <nav className="hidden lg:flex space-x-6 items-center text-lg">
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

          {/* 🧺 Basket Icon */}
          <Link
            href="/cart"
            className="relative hover:text-black transition-colors"
          >
            <ShoppingBasket className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
              {items.length}
            </span>
          </Link>

          {/* 🔐 Login Button */}
          <Link href="/login">
            <Button
              variant="outline"
              className="text-sm text-white cursor-pointer bg-[#FB8C00] hover:bg-[#E65100]"
            >
              Login
            </Button>
          </Link>
        </nav>

        {/* Mobile Basket + Menu */}
        <div className="flex items-center space-x-4 lg:hidden relative">
          {/* 🧺 Basket Icon */}
          <Link
            href="/cart"
            className="relative hover:text-black transition-colors"
          >
            <ShoppingBasket className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
              {items.length}
            </span>
          </Link>

          {/* ☰ Hamburger Menu */}
          <button
            className="text-white cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu />
          </button>
        </div>
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

          {/* 🧺 Basket Icon */}
          <Link
            href="/cart"
            className="text-pink-600 flex items-center space-x-1"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <ShoppingBasket />
            <span>Basket</span>
          </Link>

          {/* 🔐 Login Button */}
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
            <Button
              variant="outline"
              className="text-sm cursor-pointer text-white bg-[#FB8C00] hover:bg-[#E65100] border-white"
            >
              Login
            </Button>
          </Link>

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
