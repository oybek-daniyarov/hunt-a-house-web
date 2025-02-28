interface PropertyFeatureItemProps {
  value: string;
  label: string;
  hasBorder?: boolean;
}

export function PropertyFeatureItem({
  value,
  label,
  hasBorder = false,
}: PropertyFeatureItemProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${hasBorder ? 'border-x border-border/40' : ''}`}
    >
      <span className="font-semibold">{value}</span>
      <span className="text-[0.8rem] text-muted-foreground">{label}</span>
    </div>
  );
}
