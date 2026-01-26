"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/data";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Initial visibility animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Scroll detection for compact header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
        className={`w-full fixed top-0 left-0 bg-layout-beige z-50 transition-all duration-300 ease-out
         ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}
         ${isScrolled ? "h-14 shadow-medium" : "h-16 shadow-soft"}`}
      >
        <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 sm:px-6 h-full">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 transition-transform duration-200">
            <Image
              src={"/images/paria.png"}
              alt="Paria Logo"
              width={200}
              height={50}
              className="h-auto transition-all duration-300 w-32 sm:w-40 md:w-48"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex flex-row gap-6 lg:gap-8">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));

                return (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="relative group"
                    >
                      <span
                        className={`tracking-wider text-sm lg:text-base transition-colors duration-300 uppercase font-medium ${
                          isActive
                            ? "text-accent-gold"
                            : "text-foreground/70 group-hover:text-foreground"
                        }`}
                      >
                        {item.name}
                      </span>
                      {/* Animated Underline */}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-accent-gold transition-all duration-200 ease-out ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none focus:ring-2 focus:ring-accent-gold/30 rounded-md"
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
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <nav
        className={`fixed top-14 right-0 bottom-0 w-72 bg-layout-beige shadow-2xl z-40 md:hidden transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-2 p-6 pt-8">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`block py-3 px-4 rounded-lg tracking-wider text-base transition-all duration-200 uppercase font-medium ${
                    isActive
                      ? "bg-accent-gold/15 text-accent-gold border-l-4 border-accent-gold"
                      : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground hover:translate-x-1"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Footer */}
        <div className="absolute bottom-8 left-0 right-0 px-6">
          <div className="border-t border-foreground/10 pt-6">
            <p className="text-xs text-foreground-muted text-center tracking-wide">
              © 2025 Paria Photography
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}



