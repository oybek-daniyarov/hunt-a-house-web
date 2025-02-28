import { cn } from '@/lib/utils';

interface PropertyFeatureItemProps {
  value: string;
  label: string;
  hasBorder?: boolean;
  className?: string;
}

export function PropertyFeatureItem({
  value,
  label,
  hasBorder = false,
  className,
}: PropertyFeatureItemProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        hasBorder && 'border-x border-border/40',
        className
      )}
    >
      <span className="font-semibold">{value}</span>
      <span className="text-[0.8rem] text-muted-foreground">{label}</span>
    </div>
  );
}
