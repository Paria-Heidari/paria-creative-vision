import Link from "next/link";
import { navigation } from "@/data/data";
import InstagramIcon from "@/components/icons/InstagramIcon";

// Reusable Navigation Links Component
const NavLinks = ({ className = "" }: { className?: string }) => (
  <ul className={className}>
    {navigation.map((item, index) => (
      <li key={index}>
        <Link
          href={item.href}
          className="text-foreground/70 hover:text-foreground transition-colors duration-200 uppercase tracking-wide"
        >
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
);

// Reusable Social Icons Component
const SocialIcons = ({ className = "" }: { className?: string }) => (
  <div className={className}>
    <Link
      href="https://www.instagram.com/oceanus.photography/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground/70 hover:text-pink-600 transition-colors duration-200"
      aria-label="Visit our Instagram"
    >
      <InstagramIcon className="w-6 h-6" />
    </Link>
  </div>
);

// Reusable Copyright Component
const Copyright = ({ className = "" }: { className?: string }) => (
  <p className={className}>© 2025 Paria Photography. All Rights Reserved.</p>
);

export default function Footer() {
  return (
    <footer className="mt-auto py-8 lg:py-10 bg-layout-beige border-t border-foreground/10">
      <div className="px-4 sm:px-6 mx-auto max-w-screen-xl">
        {/* Mobile & Tablet Layout (< lg) - Stacked */}
        <div className="flex flex-col gap-6 lg:hidden">
          <nav className="flex justify-center">
            <NavLinks className="flex flex-wrap gap-4 sm:gap-6 justify-center text-sm sm:text-base" />
          </nav>
          <SocialIcons className="flex justify-center" />
          <Copyright className="text-xs sm:text-sm text-foreground/60 text-center" />
        </div>

        {/* Desktop Layout (≥ lg) - Horizontal */}
        <div className="hidden lg:flex items-center justify-between">
          <Copyright className="text-sm text-foreground/60" />
          <nav>
            <NavLinks className="flex gap-8 text-sm" />
          </nav>
          <SocialIcons className="flex" />
        </div>
      </div>
    </footer>
  );
}

// noopener
// Prevents the new page from accessing window.opener.
// Protects your original site from being manipulated or redirected.
// noreferrer
// Prevents sending the referrer URL (the page the user came from) to the new site.
// Improves privacy — the destination site won’t know which page the user was on.