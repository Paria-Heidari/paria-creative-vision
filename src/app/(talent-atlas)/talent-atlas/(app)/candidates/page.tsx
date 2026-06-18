'use client';

import { useEffect, useState } from 'react';
import { MOCK_CANDIDATES, MOCK_CAMPAIGNS } from '@/data/talentAtlasMockData';

type Candidate = (typeof MOCK_CANDIDATES)[number];

const stageStyles: Record<string, string> = {
  applied: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  screening: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  interview: 'bg-purple-50 text-purple-700 ring-purple-600/20',
  hired: 'bg-green-50 text-green-700 ring-green-600/20',
};

const campaignMap = Object.fromEntries(
  MOCK_CAMPAIGNS.map((c) => [c.id, c.title]),
);

const ENDPOINT = '/api/talent-atlas/candidates';

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [source, setSource] = useState<'api' | 'preview'>('preview');

  useEffect(() => {
    fetch(ENDPOINT)
      .then((r) => r.json())
      .then((data) => {
        setCandidates(data);
        setSource('api');
      })
      // FIXME: API auth (withAuth) is bypassed here — 403 falls back to mock data,
      // so unauthenticated users still see candidates in production.
      // Intentional for portfolio demo. Must enforce page-level auth before real data.
      .catch(() => {
        setCandidates(MOCK_CANDIDATES);
        setSource('preview');
      });
  }, []);

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

      {source === 'api' && (
        <p className="text-xs text-green-600">✓ Live data from REST API</p>
      )}

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
            {candidates.map((c) => (
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
