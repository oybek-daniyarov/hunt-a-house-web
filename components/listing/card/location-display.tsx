import { MapPin } from 'lucide-react';

interface LocationBreadcrumbsData {
  name: string;
  // Add other properties if needed
}

interface LocationData {
  breadcrumbs?: LocationBreadcrumbsData[] | null;
  // Add other properties if needed
}

interface LocationDisplayProps {
  locations: LocationData[];
}

export function LocationDisplay({ locations }: LocationDisplayProps) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <MapPin className="h-3.5 w-3.5 shrink-0" />
      <span className="line-clamp-1">
        {locations
          .map((location) =>
            location.breadcrumbs?.map((crumb) => crumb.name).join(' › ')
          )
          .join(' | ')}
      </span>
    </div>
  );
}
