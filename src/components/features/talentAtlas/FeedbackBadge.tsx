import type { CandidateFeedback } from '@/hooks/talent-atlas/useCandidates';

const decisionStyles: Record<string, string> = {
  proceed: 'bg-green-50 text-green-700 ring-green-600/20',
  hold: 'bg-amber-50 text-amber-700 ring-amber-600/20',
};

export function FeedbackBadge({ feedback }: { feedback: CandidateFeedback }) {
  return (
    <div className="mt-2 flex items-center gap-1.5">
      <span
        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${decisionStyles[feedback.decision]}`}
      >
        {feedback.decision}
      </span>
      <span
        className="max-w-[120px] truncate text-xs text-slate-400"
        title={feedback.feedback}
      >
        {feedback.feedback}
      </span>
    </div>
  );
}