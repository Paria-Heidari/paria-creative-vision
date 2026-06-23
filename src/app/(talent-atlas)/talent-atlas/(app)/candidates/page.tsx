'use client';

import { useCandidates } from '@/hooks/talent-atlas/useCandidates';
import { useCampaigns } from '@/hooks/talent-atlas/useCampaigns';

const stageStyles: Record<string, string> = {
  applied: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  screening: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  interview: 'bg-purple-50 text-purple-700 ring-purple-600/20',
  hired: 'bg-green-50 text-green-700 ring-green-600/20',
};

const ENDPOINT = '/api/talent-atlas/candidates';

export default function CandidatesPage() {
  const { data, isLoading, error } = useCandidates();
  const { data: campaigns } = useCampaigns();

  const campaignMap = Object.fromEntries(
    (campaigns ?? []).map((c) => [c.id, c.title]),
  );

  if (isLoading) return <p className="text-sm text-slate-500">Loading...</p>;
  if (error)
    return <p className="text-sm text-red-500">Failed to load candidates.</p>;

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-2.5 text-sm text-yellow-800">
        <span className="font-semibold">Note:</span> This page is intentionally
        open for portfolio demo purposes. API-level authorization is in place
        but page-level auth is not yet enforced — candidate data shown here is
        mock data only. This will be restricted to authorized users before real
        data is connected.
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Candidates</h1>
          <p className="mt-1 text-sm text-slate-500">
            All candidates across active campaigns
          </p>
        </div>
        <a
          href={ENDPOINT}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-500 hover:bg-slate-100"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          GET {ENDPOINT}
        </a>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {['Name', 'Email', 'Campaign', 'Stage'].map((col) => (
                <th
                  key={col}
                  className="px-5 py-3 text-left text-xs font-medium tracking-wide text-slate-500 uppercase"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data?.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-5 py-4 text-sm font-medium text-slate-900">
                  {c.full_name}
                </td>
                <td className="px-5 py-4 text-sm text-slate-500">{c.email}</td>
                <td className="px-5 py-4 text-sm text-slate-500">
                  {campaignMap[c.campaign_id] ?? '—'}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${stageStyles[c.stage] ?? ''}`}
                  >
                    {c.stage}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
