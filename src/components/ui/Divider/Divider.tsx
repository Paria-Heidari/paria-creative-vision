import { cn } from '@/lib/utils/utils';

const orientationMap = {
  horizontal: 'border-t w-full',
  vertical: 'border-r h-full self-stretch',
} as const;

const weightMap = {
  thin: 'border-1',
  medium: 'border-2',
  thick: 'border-3',
} as const;

const colorMap = {
  default: 'border-border',
  muted: 'border-border-muted',
  subtle: 'border-border-subtle',
} as const;

type DividerVariant = keyof typeof orientationMap;
type DividerWeight = keyof typeof weightMap;
type DividerColor = keyof typeof colorMap;

interface DividerProps {
  orientation: DividerVariant;
  weight?: DividerWeight;
  color?: DividerColor;
  className?: string;
}
export default function Divider({
  orientation = 'horizontal',
  weight = 'medium',
  color = 'default',
  className,
}: DividerProps) {
  const orientationClass = orientationMap[orientation];
  const weightClass = weight ? weightMap[weight] : '';
  const colorClass = color ? colorMap[color] : '';
  const dividerClass = cn(
    'border-0',
    orientationClass,
    weightClass,
    colorClass,
    className,
  );

  return <hr className={dividerClass} />;
}
