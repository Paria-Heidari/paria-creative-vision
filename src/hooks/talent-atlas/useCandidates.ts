import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query/queryKeys';
import { MOCK_CANDIDATES } from '@/data/talentAtlasMockData';

type candidate = (typeof MOCK_CANDIDATES)[number];
type NewCandidate = Omit<candidate, 'id'>;

export function useCandidates() {
  return useQuery<candidate[]>({
    queryKey: queryKeys.candidates,
    queryFn: async () => {
      const res = await fetch('/api/talent-atlas/candidates');
      if (!res.ok) throw new Error(`Candidates fetch failed ${res.status}`);
      return res.json();
    },
  });
}

export function useCreateCandidate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCandidate: NewCandidate) => {
      const res = await fetch('/api/talent-atlas/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCandidate),
      });
      if (!res.ok) throw new Error(`Create candidate failed ${res.status}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({});
    },
  });
}
