
import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import localFont from 'next/font/local';
import { BodyLayout } from "@/components/layout/Body";
import {metadataInfo} from "@/data/staticData";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const Grotesk = localFont({
  src: "../../public/fonts/founders-grotesk-regular.woff2",
  variable: "--font-grotesk",
  display: "swap",
});


export const metadata: Metadata = {
  title: metadataInfo.title,
  description: metadataInfo.description,
  icons: metadataInfo.icons,
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${Grotesk.variable} ${inter.variable} ${syne.variable} font-grotesk`}
      suppressHydrationWarning
    >
      {/* suppressHydrationWarning: extensions (e.g. Grammarly) inject attributes on <body> */}
      <body suppressHydrationWarning>
        <BodyLayout>{children}</BodyLayout>
      </body>
    </html>
  );
}
