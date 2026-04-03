import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Stack } from '../Stack';

export default function BodyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack direction="vertical" className="min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </Stack>
  );
}
