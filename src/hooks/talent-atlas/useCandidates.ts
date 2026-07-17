import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query/queryKeys';
import { MOCK_CANDIDATES } from '@/data/talentAtlasMockData';

export type CandidateFeedback = {
  company: string;
  feedback: string;
  decision: 'proceed' | 'hold';
};

type candidate = (typeof MOCK_CANDIDATES)[number] & {
  // Populated live via the company_feedback WS event — never present on the
  // initial REST fetch, since it's not persisted anywhere server-side (mock only).
  latestFeedback?: CandidateFeedback;
};
type NewCandidate = Omit<candidate, 'id'>;

const fetchCandidates = async () => {
  const res = await fetch('/api/talent-atlas/candidates');
  if (!res.ok) throw new Error(`Candidates fetch failed ${res.status}`);
  return res.json();
};

export function useCandidates() {
  return useQuery<candidate[]>({
    queryKey: queryKeys.candidates,
    queryFn: fetchCandidates,
  });
}
// Create a new candidate and invalidate the candidates query to refetch the updated list
const createCandidate = async (newCandidate: NewCandidate) => {
  const res = await fetch('/api/talent-atlas/candidates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCandidate),
  });
  if (!res.ok) throw new Error(`Create candidate failed ${res.status}`);
  return res.json();
};

export function useCreateCandidate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.candidates });
    },
  });
}
