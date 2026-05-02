export default function Loading() {
  return (
    <div className="flex items-center justify-center py-24">
      <span className="h-2 w-2 rounded-full bg-accent-gold animate-bounce [animation-delay:-0.3s]" />
      <span className="mx-1.5 h-2 w-2 rounded-full bg-accent-gold animate-bounce [animation-delay:-0.15s]" />
      <span className="h-2 w-2 rounded-full bg-accent-gold animate-bounce" />
    </div>
  );
}