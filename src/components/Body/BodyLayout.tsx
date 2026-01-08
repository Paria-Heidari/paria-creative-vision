import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function BodyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <div className="mx-auto w-full">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
