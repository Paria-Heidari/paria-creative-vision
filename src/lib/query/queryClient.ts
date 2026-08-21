import { QueryClient } from '@tanstack/react-query';

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // data is fresh for 60s — no refetch on tab
        staleTime: 1000 * 60,
        // prevents double-fetches
        refetchOnWindowFocus: false,
        retry: 2, // retries failed GETs twice before showing error
      },
      mutations: {
        retry: 1, // retries failed POSTs once (safe here, IDs are server-generated)
      },
    },
  });
}
