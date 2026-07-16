import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query/queryKeys';
import { MOCK_COMPANIES } from '@/data/talentAtlasMockData';

type Company = (typeof MOCK_COMPANIES)[number];

const fetchCompanies = async () => {
  const res = await fetch('/api/talent-atlas/companies');
  if (!res.ok) throw new Error(`Companies fetch failed ${res.status}`);
  return res.json();
};

export function useCompanies() {
  return useQuery<Company[]>({
    queryKey: queryKeys.companies,
    queryFn: fetchCompanies,
  });
}
