import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import BodyLayout from "@/components/Body/bodyLayout";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const Grotesk = localFont({
  src: "../public/fonts/founders-grotesk-regular.woff2",
  variable: "--font-grotesk",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Paria Creative Hub",
  description: "Personal portfolio of Paria",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${Grotesk.className} font-grotesk`}>
      <body>
        <BodyLayout>
          <Header />
          {children}
          <Footer />
        </BodyLayout>
      </body>
    </html>
  );
}
