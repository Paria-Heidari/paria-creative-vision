'use client';
import { useRealtimeSync } from '@/hooks/talent-atlas/useRealtimeSync';

export function RealtimeProvider() {
  useRealtimeSync();
  return null;
}
