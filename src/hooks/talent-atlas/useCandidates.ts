import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query/queryKeys';
import { MOCK_CANDIDATES } from '@/data/talentAtlasMockData';
import type { CreateCandidateInput } from '@/lib/schemas/talentAtlas';

export type CandidateFeedback = {
  company: string;
  feedback: string;
  decision: 'proceed' | 'hold';
};

export type Candidate = (typeof MOCK_CANDIDATES)[number] & {
  // Populated live via the company_feedback WS event — never present on the
  // initial REST fetch, since it's not persisted anywhere server-side (mock only).
  latestFeedback?: CandidateFeedback;
};

const fetchCandidates = async () => {
  const res = await fetch('/api/talent-atlas/candidates');
  if (!res.ok) throw new Error(`Candidates fetch failed ${res.status}`);
  return res.json();
};

export function useCandidates() {
  return useQuery<Candidate[]>({
    queryKey: queryKeys.candidates,
    queryFn: fetchCandidates,
  });
}

const createCandidate = async (input: CreateCandidateInput) => {
  const res = await fetch('/api/talent-atlas/candidates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Create candidate failed ${res.status}`);
  }
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

const updateCandidateStage = async ({ id, stage }: { id: string; stage: string }) => {
  const res = await fetch(`/api/talent-atlas/candidates/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stage }),
  });
  if (!res.ok) throw new Error(`Update stage failed ${res.status}`);
  return res.json();
};

export function useUpdateCandidateStage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCandidateStage,
    onMutate: async ({ id, stage }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.candidates });
      const previous = queryClient.getQueryData(queryKeys.candidates);
      queryClient.setQueryData(
        queryKeys.candidates,
        (old: Candidate[] = []) => old.map((c) => (c.id === id ? { ...c, stage } : c)),
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(queryKeys.candidates, ctx.previous);
    },
  });
}
