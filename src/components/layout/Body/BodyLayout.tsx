import { Suspense } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Stack } from '@/components/layout/Stack';
import { cn } from '@/lib/utils/utils';

export default function BodyLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Stack
      direction="vertical"
      gap={0}
      className={cn('min-h-screen', className)}
    >
      <Suspense
        fallback={
          <div className="bg-surface-alt fixed top-0 left-0 z-50 h-16 w-full" />
        }
      >
        <Header />
      </Suspense>
      <main className="flex-grow">{children}</main>
      <Footer />
    </Stack>
  );
}
