import { BodyLayout } from '@/components/layout/Body';

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BodyLayout>{children}</BodyLayout>;
}
