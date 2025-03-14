import { Badge } from '@/components/ui/badge';

interface PropertyBadgesProps {
  propertyTypeName: string;
  activityTypeName: string;
}

const activityTypeBadgeColors = {
  rent: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
  sell: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
  buy: 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20',
  default: undefined,
};

export function PropertyBadges({
  propertyTypeName,
  activityTypeName,
}: PropertyBadgesProps) {
  const getActivityTypeBadgeColor = (label: string) => {
    if (label.toLowerCase().includes('rent'))
      return activityTypeBadgeColors.rent;
    if (label.toLowerCase().includes('sell'))
      return activityTypeBadgeColors.sell;
    if (label.toLowerCase().includes('buy')) return activityTypeBadgeColors.buy;
    return activityTypeBadgeColors.default;
  };

  return (
    <div className="flex items-start justify-between text-xs gap-2">
      <Badge variant="secondary" size="sm">
        {propertyTypeName}
      </Badge>
      <Badge
        size="sm"
        className={`${getActivityTypeBadgeColor(activityTypeName)}`}
      >
        {activityTypeName}
      </Badge>
    </div>
  );
}
