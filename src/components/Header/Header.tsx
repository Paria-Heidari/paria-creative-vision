"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import pariaLogo from "../../../public/images/paria.png";
import { navigation } from "@/data/data";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`w-full fixed top-0 left-0 h-16 bg-layout-beige shadow-soft transition-all duration-500 ease-out z-50
         ${
           isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
         }`}
      >
        <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 sm:px-6 py-2 h-full">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={pariaLogo}
              alt="Paria Logo"
              width={200}
              height={50}
              className="w-32 sm:w-40 md:w-48 h-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex flex-row gap-6 lg:gap-8">
              {navigation.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`tracking-wider text-sm lg:text-base transition-colors duration-300 uppercase ${
                      pathname === item.href
                        ? "text-foreground font-semibold"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none focus:ring-2 focus:ring-foreground/20 rounded-md"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen
                  ? "rotate-45 translate-y-1.5"
                  : "rotate-0 translate-y-0"
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-foreground my-1.5 transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen
                  ? "-rotate-45 -translate-y-1.5"
                  : "rotate-0 translate-y-0"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <nav
        className={`fixed top-16 right-0 bottom-0 w-64 bg-layout-beige shadow-2xl z-40 md:hidden transform transition-transform duration-600 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-1 p-6">
          {navigation.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`block py-3 px-4 rounded-md tracking-wider text-base transition-colors duration-200 uppercase ${
                  pathname === item.href
                    ? "bg-foreground/10 text-foreground font-semibold"
                    : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}



