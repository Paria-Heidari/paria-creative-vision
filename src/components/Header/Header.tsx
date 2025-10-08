import Image from "next/image";
import Link from "next/link";
import pariaLogo from '../../public/images/paria.png'

const navigation = [
  {
    name: "Home",
    href: "/",
    current: true,
  },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Articles", href: "/articles" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  return (
    <header className="w-full bg-header-beige shadow-soft">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/">
          <Image src={pariaLogo} alt="logo" width={200} />
        </Link>
        <nav className="items-center">
          <ul className="flex flex-row gap-5">
            {navigation.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}



