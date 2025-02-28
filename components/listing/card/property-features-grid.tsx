import { formatSize } from '@/lib/utils/format-number';
import { PropertyFeatureItem } from './property-feature-item';

interface PropertyFeaturesGridProps {
  bedrooms: number | null;
  bathrooms: number | null;
  minSize: number | null;
}

export function PropertyFeaturesGrid({
  bedrooms,
  bathrooms,
  minSize,
}: PropertyFeaturesGridProps) {
  const formatBedrooms = (beds: number | null) => {
    if (beds === null || beds === undefined) return 'N/A';
    return beds === 0 ? 'Studio' : beds.toString();
  };

  const isStudio = bedrooms === 0;

  return (
    <div className="grid grid-cols-3 gap-3 rounded-lg bg-muted/50 p-1.5 text-sm border border-border/40">
      <PropertyFeatureItem
        value={formatBedrooms(bedrooms)}
        label={!isStudio ? 'Beds' : 'Studio'}
      />

      <PropertyFeatureItem
        value={bathrooms?.toString() || 'N/A'}
        label="Baths"
        hasBorder
      />

      <PropertyFeatureItem
        value={minSize ? formatSize(minSize).replace(' sq ft', '') : 'N/A'}
        label="Sq Ft"
      />
    </div>
  );
}
