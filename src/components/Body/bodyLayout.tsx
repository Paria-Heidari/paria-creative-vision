import Footer from "../Footer/Footer";
import Header from "../Header/Header";
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
