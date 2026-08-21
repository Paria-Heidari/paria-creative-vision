import type { Candidate } from '@/hooks/talent-atlas/useCandidates';
import { FeedbackBadge } from './FeedbackBadge';

export function CandidateCard({
  candidate,
  campaignName,
  onDragStart,
}: {
  candidate: Candidate;
  campaignName: string;
  onDragStart: (e: React.DragEvent) => void;
}) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="cursor-grab rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-all select-none hover:border-slate-300 hover:shadow-md active:cursor-grabbing"
    >
      <p className="text-sm font-medium text-slate-900">{candidate.full_name}</p>
      <p className="mt-0.5 text-xs text-slate-500">{candidate.email}</p>
      <p className="mt-1.5 text-xs text-slate-400">{campaignName}</p>
      {candidate.latestFeedback && <FeedbackBadge feedback={candidate.latestFeedback} />}
    </div>
  );
}