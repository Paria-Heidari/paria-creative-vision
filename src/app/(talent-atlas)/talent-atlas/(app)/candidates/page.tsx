'use client';

import { useState } from 'react';
import { useCandidates, useUpdateCandidateStage } from '@/hooks/talent-atlas/useCandidates';
import { useCampaigns } from '@/hooks/talent-atlas/useCampaigns';
import { STAGES } from '@/data/talentAtlasMockData';
import { KanbanColumn } from '@/components/features/talentAtlas/KanbanColumn';
import { AddCandidateForm } from '@/components/features/talentAtlas/AddCandidateForm';

export default function CandidatesPage() {
  const { data } = useCandidates();
  const { data: campaigns } = useCampaigns();
  const { mutate: updateStage } = useUpdateCandidateStage();

  const [showForm, setShowForm] = useState(false);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);

  const candidates = data ?? [];
  const activeCampaigns = (campaigns ?? []).filter((c) => c.status === 'active');
  const campaignMap = Object.fromEntries((campaigns ?? []).map((c) => [c.id, c.title]));

  const handleDragStart = (e: React.DragEvent, candidateId: string) => {
    e.dataTransfer.setData('candidateId', candidateId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent, stage: string) => {
    e.preventDefault();
    setDragOverStage(null);
    const id = e.dataTransfer.getData('candidateId');
    const candidate = candidates.find((c) => c.id === id);
    if (!candidate || candidate.stage === stage) return;
    updateStage({ id, stage });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Candidates</h1>
          <p className="mt-1 text-sm text-slate-500">
            Drag cards between columns to move candidates through the pipeline
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-700"
        >
          {showForm ? 'Cancel' : '+ Add candidate'}
        </button>
      </div>

      {showForm && (
        <AddCandidateForm
          activeCampaigns={activeCampaigns}
          onSuccess={() => setShowForm(false)}
        />
      )}

      <div className="grid grid-cols-5 gap-4">
        {STAGES.map((stage) => (
          <KanbanColumn
            key={stage}
            stage={stage}
            cards={candidates.filter((c) => c.stage === stage)}
            campaignMap={campaignMap}
            isOver={dragOverStage === stage}
            onDragStart={handleDragStart}
            onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; setDragOverStage(stage); }}
            onDragLeave={() => setDragOverStage(null)}
            onDrop={(e) => handleDrop(e, stage)}
          />
        ))}
      </div>
    </div>
  );
}
