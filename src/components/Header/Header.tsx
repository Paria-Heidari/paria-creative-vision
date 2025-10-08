"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import pariaLogo from "../../../public/images/paria.png";

const navigation = [
  {
    name: "HOME",
    href: "/",
    current: true,
  },
  { name: "PORTFOLIO", href: "/pages/portfolio/photography" },
  { name: "ARTICLES", href: "/pages/articles" },
  { name: "ABOUT", href: "/pages/about" },
];

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header 
      className={`w-full bg-header-beige shadow-soft transition-all duration-500 ease-out 
         ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/">
          <Image src={pariaLogo} alt="logo" width={200} />
        </Link>
        <nav className="items-center">
          <ul className="flex flex-row gap-5">
            {navigation.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="tracking-wider text-foreground hover:text-foreground/50 transition-colors duration-300 uppercase"
                >
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}



