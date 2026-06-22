'use client';

import { useEffect, useState } from 'react';
import { MOCK_CAMPAIGNS } from '@/data/talentAtlasMockData';

// stays automatically in sync if we change the mock data - don´t need to update the type separately.
type Campaign = (typeof MOCK_CAMPAIGNS)[number];

const statusStyles: Record<string, string> = {
  active: 'bg-green-50 text-green-700 ring-green-600/20',
  draft: 'bg-slate-100 text-slate-600 ring-slate-500/20',
};

const ENDPOINT = '/api/talent-atlas/campaigns';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [source, setSource] = useState<'api' | 'preview'>('preview');

  useEffect(() => {
    fetch(ENDPOINT)
      .then((r) => r.json())
      .then((data) => {
        setCampaigns(data);
        setSource('api');
      })
      .catch(() => {
        setCampaigns(MOCK_CAMPAIGNS);
        setSource('preview');
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Campaigns</h1>
          <p className="mt-1 text-sm text-slate-500">
            Active and draft hiring campaigns
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

      {source === 'api' && (
        <p className="text-xs text-green-600">✓ Live data from REST API</p>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {['Campaign', 'Company', 'Status', 'Applied', 'Hired'].map(
                (col) => (
                  <th
                    key={col}
                    className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500"
                  >
                    {col}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {campaigns.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-5 py-4 text-sm font-medium text-slate-900">
                  {c.title}
                </td>
                <td className="px-5 py-4 text-sm text-slate-500">
                  {c.partner_company ?? '—'}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyles[c.status]}`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-slate-700">
                  {c.applied_count}
                </td>
                <td className="px-5 py-4 text-sm text-slate-700">
                  {c.hired_count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
