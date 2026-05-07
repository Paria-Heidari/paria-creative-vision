import { Circle, Clock, Loader } from 'lucide-react';

export const WORK_STATUS = {
  live: {
    label: 'Live',
    icon: Circle,
    className: 'bg-success/10 text-success border border-success/20',
    iconClassName: 'fill-success text-success',
  },
  'coming-soon': {
    label: 'Coming Soon',
    icon: Clock,
    className: 'bg-accent text-foreground-muted border border-border',
    iconClassName: 'text-foreground-muted',
  },
  'in-progress': {
    label: 'In Progress',
    icon: Loader,
    className: 'bg-warning/10 text-warning border border-warning/20',
    iconClassName: 'animate-spin text-warning',
  },
};
