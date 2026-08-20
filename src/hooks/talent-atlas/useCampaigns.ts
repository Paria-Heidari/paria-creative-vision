import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query/queryKeys';
import { MOCK_CAMPAIGNS } from '@/data/talentAtlasMockData';
import type { CreateCampaignInput } from '@/lib/schemas/talentAtlas';

type Campaign = (typeof MOCK_CAMPAIGNS)[number];

const fetchCampaigns = async () => {
  const res = await fetch('/api/talent-atlas/campaigns');
  if (!res.ok) throw new Error(`Campaigns fetch failed ${res.status}`);
  return res.json();
};

export function useCampaigns() {
  return useQuery<Campaign[]>({
    queryKey: queryKeys.campaigns,
    queryFn: fetchCampaigns,
  });
}

const createCampaign = async (input: CreateCampaignInput) => {
  const res = await fetch('/api/talent-atlas/campaigns', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Create campaign failed ${res.status}`);
  }
  return res.json();
};

export function useCreateCampaign() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.campaigns });
    },
  });
}
