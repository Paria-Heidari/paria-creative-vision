'use client';

import { Users, Megaphone, TrendingUp, Clock } from 'lucide-react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useCandidates } from '@/hooks/talent-atlas/useCandidates';
import { useCampaigns } from '@/hooks/talent-atlas/useCampaigns';

export function DashboardOverview() {
  const { user, isLoading: isUserLoading } = useUser();
  const { data: campaigns, isLoading: isCampaignsLoading, error: campaignsError } = useCampaigns();
  const { data: candidates, isLoading: isCandidatesLoading, error: candidatesError } = useCandidates();

  if (isUserLoading || isCampaignsLoading || isCandidatesLoading) {
    return <div>Loading...</div>;
  }
  if (campaignsError || candidatesError) {
    return <p className="text-sm text-red-500">Failed to load dashboard data.</p>;
  }

  const allCampaigns = campaigns ?? [];
  const allCandidates = candidates ?? [];

  const totalHired = allCampaigns.reduce((sum, c) => sum + c.hired_count, 0);
  const totalApplied = allCampaigns.reduce((sum, c) => sum + c.applied_count, 0);
  const activeCampaignsCount = allCampaigns.filter((c) => c.status === 'active').length;
  const hireRate = totalApplied > 0 ? `${((totalHired / totalApplied) * 100).toFixed(1)}%` : '—';

  const stats = [
    { label: 'Total Hired', value: String(totalHired), icon: Users },
    { label: 'Active Campaigns', value: String(activeCampaignsCount), icon: Megaphone },
    { label: 'Hire Rate', value: hireRate, icon: TrendingUp },
    // Not computable from current data: MOCK_CANDIDATES/MOCK_CAMPAIGNS have no
    // applied_at/hired_at timestamps, so there's nothing to average.
    { label: 'Avg Time to Hire', value: '—', icon: Clock },
  ];

  const topCampaigns = [...allCampaigns]
    .sort((a, b) => b.applied_count - a.applied_count)
    .slice(0, 3)
    .map((c) => ({
      name: c.title,
      applicants: c.applied_count,
      progress: c.applied_count > 0 ? Math.round((c.hired_count / c.applied_count) * 100) : 0,
    }));

  const campaignMap = Object.fromEntries(allCampaigns.map((c) => [c.id, c.title]));
  const recentCandidates = allCandidates.slice(0, 4).map((candidate) => ({
    id: candidate.id,
    text: `${candidate.full_name} applied to ${campaignMap[candidate.campaign_id] ?? 'a campaign'}`,
    stage: candidate.stage,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        {user && (<h2 className="text-slate-500">Welcome back, {user.given_name}!</h2>)}
        <p className="mt-1 text-sm text-slate-500">
          Overview of your hiring activity
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <Icon size={18} className="text-slate-400" />
              </div>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-base font-semibold text-slate-900">
            Active Campaigns
          </h2>
          <ul className="mt-4 space-y-4">
            {topCampaigns.map((campaign) => (
              <li key={campaign.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    {campaign.name}
                  </span>
                  <span className="text-slate-500">
                    {campaign.applicants} applicants
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
                  <div
                    className="h-1.5 rounded-full bg-blue-600"
                    style={{ width: `${campaign.progress}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-base font-semibold text-slate-900">
            Recent Candidates
          </h2>
          <ul className="mt-4 space-y-4">
            {recentCandidates.map((item) => (
              <li key={item.id} className="flex gap-3 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                <div>
                  <p className="text-slate-700">{item.text}</p>
                  <p className="text-xs text-slate-400 capitalize">{item.stage}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
