import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface LocationDisplayProps {
  locations: App.Services.Location.Data.LocationData[];
  max?: number;
  className?: string;
}

export function LocationDisplay({
  locations,
  max = 100,
  className,
}: LocationDisplayProps) {
  return (
    <div
      className={cn(
        'flex items-center flex-wrap pb-px lg:pb-0 gap-1 text-sm text-muted-foreground',
        className
      )}
    >
      {locations.slice(0, max).map((location) => (
        <Badge variant="outline" size="sm" key={location.id}>
          {location.name}
        </Badge>
      ))}
    </div>
  );
}
