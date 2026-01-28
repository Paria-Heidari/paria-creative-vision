import Link from "next/link";
import { navigation } from "@/data/data";
import { Instagram, Linkedin, Mail } from "lucide-react";
import GitHubIcon from "@/components/icons/GitHubIcon";

// Navigation Links Component
const NavLinks = ({ className = "" }: { className?: string }) => (
  <ul className={className}>
    {navigation.map((item, index) => (
      <li key={index}>
        <Link
          href={item.href}
          className="text-foreground-muted hover:text-accent-gold transition-colors duration-300 uppercase tracking-wider text-base font-medium"
        >
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
);

// Social Icons Component
const SocialIcons = () => (
  <div className="flex items-center gap-4">
    <Link
      href="https://www.instagram.com/oceanus.photography/"
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-foreground-muted hover:bg-accent-gold hover:text-white transition-all duration-300"
      aria-label="Instagram"
    >
      <Instagram className="w-5 h-5" />
    </Link>
    <Link
      href="https://github.com"
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-foreground-muted hover:bg-accent-gold hover:text-white transition-all duration-300"
      aria-label="GitHub"
    >
      <GitHubIcon className="w-5 h-5" />
    </Link>
    <Link
      href="https://linkedin.com"
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-foreground-muted hover:bg-accent-gold hover:text-white transition-all duration-300"
      aria-label="LinkedIn"
    >
      <Linkedin className="w-5 h-5" />
    </Link>
  </div>
);

export default function Footer() {
  return (
    <footer className="mt-auto bg-layout-beige">
      {/* Top Section */}
      <div className="border-t border-foreground/10">
        <div className="px-6 sm:px-8 py-12 lg:py-16 mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-syne font-bold text-foreground mb-4">
                Paria Creative Vision
              </h3>
              <p className="text-foreground-muted leading-relaxed mb-6 max-w-md">
                Where code inspires creativity and photography captures emotion.
                Merging the digital and visual worlds to create stories that reflect
                both structure and soul.
              </p>
              <SocialIcons />
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Navigation
              </h4>
              <NavLinks className="flex flex-col gap-3" />
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Get in Touch
              </h4>
              <Link
                href="mailto:paria.heidari.ph@gmail.com"
                className="inline-flex items-center gap-2 text-foreground-muted hover:text-accent-gold transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
                <span className="text-base">paria.heidari.ph@gmail.com</span>
              </Link>
              <p className="mt-4 text-sm text-foreground-muted">
                Available for freelance projects and collaborations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-foreground/10">
        <div className="px-6 sm:px-8 py-6 mx-auto max-w-screen-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-foreground-subtle">
              © {new Date().getFullYear()} Paria Photography. All Rights Reserved.
            </p>
            <p className="text-sm text-foreground-subtle">
              Crafted with passion in <span className="text-accent-gold">Europe</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}