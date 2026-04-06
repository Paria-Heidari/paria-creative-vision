import { cn } from '@/lib/utils/utils';

interface DecorativeLineProps {
  className?: string;
}

export default function DecorativeLine({ className }: DecorativeLineProps) {
  return (
    <div className={cn('bg-accent-gold h-1 w-12 rounded-full', className)} />
  );
}
