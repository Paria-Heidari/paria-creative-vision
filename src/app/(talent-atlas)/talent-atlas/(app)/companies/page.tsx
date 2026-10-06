'use client';

import { useCompanies } from '@/hooks/talent-atlas/useCompanies';

const ENDPOINT = '/api/talent-atlas/companies';

export default function CompaniesPage() {
  const { data, isLoading, error } = useCompanies();

  if (isLoading) return <p className="text-sm text-foreground-muted">Loading...</p>;
  if (error) return <p className="text-sm text-red-500">Failed to load companies.</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Companies</h1>
          <p className="mt-1 text-sm text-foreground-muted">
            Partner companies and their open campaigns
          </p>
        </div>
        <a
          href={ENDPOINT}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-muted px-3 py-1.5 font-mono text-xs text-foreground-muted hover:bg-surface-strong"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          GET {ENDPOINT}
        </a>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-surface-muted">
            <tr>
              {['Company', 'Location', 'Open Campaigns'].map((col) => (
                <th
                  key={col}
                  className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground-muted"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-muted">
            {data?.map((c) => (
              <tr key={c.id} className="hover:bg-surface-muted">
                <td className="px-5 py-4 text-sm font-medium text-foreground">
                  {c.name}
                </td>
                <td className="px-5 py-4 text-sm text-foreground-muted">
                  {c.location}
                </td>
                <td className="px-5 py-4 text-sm text-foreground-secondary">
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
