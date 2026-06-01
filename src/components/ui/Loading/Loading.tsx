import { cn } from '@/lib/utils/utils';

export default function Loading({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center py-24', className)}>
      <span className="bg-accent-gold h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]" />
      <span className="bg-accent-gold mx-1.5 h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]" />
      <span className="bg-accent-gold h-2 w-2 animate-bounce rounded-full" />
    </div>
  );
}
