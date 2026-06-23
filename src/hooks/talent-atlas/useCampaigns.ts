import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query/queryKeys';
import { MOCK_CAMPAIGNS } from '@/data/talentAtlasMockData';

type Campaign = (typeof MOCK_CAMPAIGNS)[number];

export function useCampaigns() {
  return useQuery<Campaign[]>({
    queryKey: queryKeys.campaigns,
    queryFn: async () => {
      const res = await fetch('/api/talent-atlas/campaigns');
      if (!res.ok) throw new Error(`Campaigns fetch failed ${res.status}`);
      return res.json();
    },
  });
}
