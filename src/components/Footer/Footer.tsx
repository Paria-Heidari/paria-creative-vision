import Link from "next/link";
import {navigation} from '@/data/data';
import InstagramIcon from "@/components/icons/InstagramIcon";

export default function Footer() {
  return (
    <footer className="mt-auto py-8 text-center text-sm text-gray-700 bg-layout-beige">
      <div className="flex px-6 mx-auto max-w-6x items-center justify-between">
        <p className="text-sm">
          © 2025 Paria Photography. All Rights Reserved.
        </p>
        <ul className="flex gap-4">
          {navigation.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <div className="flex">
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-pink-600 transition-colors"
          >
            <InstagramIcon className="w-6 h-6 ml-auto" />
          </Link>
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