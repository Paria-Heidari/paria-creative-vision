import { cn } from "@/lib/utils/utils";

export default function Loading({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center py-24", className)}>
      <span className="h-2 w-2 rounded-full bg-accent-gold animate-bounce [animation-delay:-0.3s]" />
      <span className="mx-1.5 h-2 w-2 rounded-full bg-accent-gold animate-bounce [animation-delay:-0.15s]" />
      <span className="h-2 w-2 rounded-full bg-accent-gold animate-bounce" />
    </div>
  );
}