import { Building2, MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

interface PropertyInfoProps {
  listing: App.Data.Lead.LeadListData;
}

export function PropertyInfo({ listing }: PropertyInfoProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm">
        <Building2 className="h-4 w-4 text-primary" />
        <span className="font-medium">{listing.propertyTypeName}</span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">
          {listing.activityTypeName}
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <MapPin className="h-4 w-4 text-primary" />
        <div className="flex items-center flex-wrap gap-1">
          {listing.locations.map((location) => (
            <Badge variant="outline" size="sm" key={location.id}>
              {location.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
