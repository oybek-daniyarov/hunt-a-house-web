import { Badge } from '@/components/ui/badge';

interface PropertyBadgesProps {
  propertyTypeName: string;
  activityTypeName: string;
}

export function PropertyBadges({
  propertyTypeName,
  activityTypeName,
}: PropertyBadgesProps) {
  return (
    <div className="flex items-start justify-between text-xs">
      <Badge variant="secondary" size="sm">
        {propertyTypeName}
      </Badge>
      <Badge
        size="sm"
        className={`bg-blue-500/10 text-blue-500 hover:bg-blue-500/20`}
      >
        {activityTypeName}
      </Badge>
    </div>
  );
}
