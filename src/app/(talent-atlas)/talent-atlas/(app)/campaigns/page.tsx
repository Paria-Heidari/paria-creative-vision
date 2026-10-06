'use client';

import { useState } from 'react';
import { useCampaigns, useCreateCampaign } from '@/hooks/talent-atlas/useCampaigns';

const statusStyles: Record<string, string> = {
  active: 'bg-green-50 text-green-700 ring-green-600/20',
  draft: 'bg-surface-strong text-foreground-secondary ring-foreground-muted/20',
};

const ENDPOINT = '/api/talent-atlas/campaigns';

const EMPTY_FORM = { title: '', status: 'draft' as 'active' | 'draft', partner_company: '' };

export default function CampaignsPage() {
  const { data, isLoading, error } = useCampaigns();
  const { mutate: createCampaign, isPending, error: createError } = useCreateCampaign();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCampaign(
      {
        title: form.title,
        status: form.status,
        partner_company: form.partner_company.trim() || null,
      },
      {
        onSuccess: () => {
          setForm(EMPTY_FORM);
          setShowForm(false);
        },
      },
    );
  };

  if (isLoading) return <p className="text-sm text-foreground-muted">Loading...</p>;
  if (error) return <p className="text-sm text-red-500">Failed to load campaigns.</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Campaigns</h1>
          <p className="mt-1 text-sm text-foreground-muted">Active and draft hiring campaigns</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={ENDPOINT}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-muted px-3 py-1.5 font-mono text-xs text-foreground-muted hover:bg-surface-strong"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            GET {ENDPOINT}
          </a>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="rounded-lg bg-action-primary px-3 py-1.5 text-xs font-medium text-on-action-primary hover:bg-action-primary-hover"
          >
            {showForm ? 'Cancel' : '+ Add campaign'}
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-border bg-surface p-5 space-y-4"
        >
          <h2 className="text-sm font-semibold text-foreground-secondary">New campaign</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-medium text-foreground-secondary">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Berlin Backend Engineer"
                className="w-full rounded-lg border border-border px-3 py-2 text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-focus"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-foreground-secondary">Status</label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((f) => ({ ...f, status: e.target.value as 'active' | 'draft' }))
                }
                className="w-full rounded-lg border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-focus"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-foreground-secondary">
                Partner company
              </label>
              <input
                value={form.partner_company}
                onChange={(e) => setForm((f) => ({ ...f, partner_company: e.target.value }))}
                placeholder="e.g. SAP SE"
                className="w-full rounded-lg border border-border px-3 py-2 text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-focus"
              />
            </div>
          </div>
          {createError && (
            <p className="text-xs text-red-500">{createError.message}</p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-action-primary px-4 py-2 text-xs font-medium text-on-action-primary hover:bg-action-primary-hover disabled:opacity-50"
            >
              {isPending ? 'Creating…' : 'Create campaign'}
            </button>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-surface-muted">
            <tr>
              {['Campaign', 'Company', 'Status', 'Applied', 'Hired'].map((col) => (
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
                <td className="px-5 py-4 text-sm font-medium text-foreground">{c.title}</td>
                <td className="px-5 py-4 text-sm text-foreground-muted">{c.partner_company ?? '—'}</td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyles[c.status]}`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-foreground-secondary">{c.applied_count}</td>
                <td className="px-5 py-4 text-sm text-foreground-secondary">{c.hired_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
