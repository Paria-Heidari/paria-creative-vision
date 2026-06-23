'use client';

import { useCompanies } from '@/hooks/talent-atlas/useCompanies';

const ENDPOINT = '/api/talent-atlas/companies';

export default function CompaniesPage() {
  const { data, isLoading, error } = useCompanies();

  if (isLoading) return <p className="text-sm text-slate-500">Loading...</p>;
  if (error) return <p className="text-sm text-red-500">Failed to load companies.</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Companies</h1>
          <p className="mt-1 text-sm text-slate-500">
            Partner companies and their open campaigns
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
              {['Company', 'Location', 'Open Campaigns'].map((col) => (
                <th
                  key={col}
                  className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500"
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
                  {c.name}
                </td>
                <td className="px-5 py-4 text-sm text-slate-500">
                  {c.location}
                </td>
                <td className="px-5 py-4 text-sm text-slate-700">
                  {c.open_campaigns}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
