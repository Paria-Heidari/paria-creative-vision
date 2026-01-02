import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import BodyLayout from "@/components/Body/bodyLayout";
import { Syne, Inter } from "next/font/google";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });;
const Grotesk = localFont({
  src: "../../public/fonts/founders-grotesk-regular.woff2",
  variable: "--font-grotesk",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Paria Creative Vision",
  description: "Personal portfolio of Paria",
  icons: {
    icon: "/images/logo.jpg",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${Grotesk.className} ${inter.className} ${syne.className} font-grotesk`}
    >
      <body>
        <BodyLayout>{children}</BodyLayout>
      </body>
    </html>
  );
}
