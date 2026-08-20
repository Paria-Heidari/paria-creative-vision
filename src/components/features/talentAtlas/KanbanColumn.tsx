import type { Candidate } from '@/hooks/talent-atlas/useCandidates';
import { STAGE_LABELS, STAGE_COLORS } from '@/data/talentAtlasMockData';
import { CandidateCard } from './CandidateCard';

export function KanbanColumn({
  stage,
  cards,
  campaignMap,
  isOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragStart,
}: {
  stage: string;
  cards: Candidate[];
  campaignMap: Record<string, string>;
  isOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
}) {
  const colors = STAGE_COLORS[stage as keyof typeof STAGE_COLORS];

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`flex flex-col rounded-xl border transition-colors ${
        isOver ? 'border-slate-400 bg-slate-100' : 'border-slate-200 bg-slate-50'
      }`}
    >
      <div
        className={`flex items-center justify-between rounded-t-xl border-b px-4 py-3 ${colors.header}`}
      >
        <span className="text-xs font-semibold uppercase tracking-wide">
          {STAGE_LABELS[stage as keyof typeof STAGE_LABELS]}
        </span>
        <span className="rounded-full bg-white/60 px-2 py-0.5 text-xs font-medium">
          {cards.length}
        </span>
      </div>

      <div className="flex min-h-[200px] flex-col gap-2 p-2">
        {cards.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            campaignName={campaignMap[candidate.campaign_id] ?? '—'}
            onDragStart={(e) => onDragStart(e, candidate.id)}
          />
        ))}

        {cards.length === 0 && (
          <div
            className={`flex flex-1 items-center justify-center rounded-lg border-2 border-dashed py-6 text-xs text-slate-400 transition-colors ${
              isOver ? 'border-slate-400' : 'border-slate-200'
            }`}
          >
            Drop here
          </div>
        )}
      </div>
    </div>
  );
}