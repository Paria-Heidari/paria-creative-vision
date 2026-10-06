'use client';

import { useState } from 'react';
import { useCreateCandidate } from '@/hooks/talent-atlas/useCandidates';

type Campaign = { id: string; title: string; partner_company: string | null };

const EMPTY_FORM = { full_name: '', email: '', campaign_id: '' };

export function AddCandidateForm({
  activeCampaigns,
  onSuccess,
}: {
  activeCampaigns: Campaign[];
  onSuccess: () => void;
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const { mutate: createCandidate, isPending, error } = useCreateCandidate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCandidate(
      { full_name: form.full_name, email: form.email, campaign_id: form.campaign_id },
      { onSuccess: () => { setForm(EMPTY_FORM); onSuccess(); } },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-border bg-surface p-5"
    >
      <h2 className="text-sm font-semibold text-foreground-secondary">New candidate</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-foreground-secondary">
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            required
            value={form.full_name}
            onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
            placeholder="e.g. Jane Doe"
            className="w-full rounded-lg border border-border px-3 py-2 text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-focus"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-foreground-secondary">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="jane@example.com"
            className="w-full rounded-lg border border-border px-3 py-2 text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-focus"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-foreground-secondary">
            Campaign <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={form.campaign_id}
            onChange={(e) => setForm((f) => ({ ...f, campaign_id: e.target.value }))}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-focus"
          >
            <option value="">Select campaign…</option>
            {activeCampaigns.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
                {c.partner_company ? ` — ${c.partner_company}` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">{error.message}</p>}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-action-primary px-4 py-2 text-xs font-medium text-on-action-primary hover:bg-action-primary-hover disabled:opacity-50"
        >
          {isPending ? 'Adding…' : 'Add candidate'}
        </button>
      </div>
    </form>
  );
}
