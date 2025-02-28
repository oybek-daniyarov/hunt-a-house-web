import { formatToThousands } from '@/lib/utils/format-number';
import { PropertyFeatureItem } from './property-feature-item';

interface PropertyFeaturesGridProps {
  bedrooms: number | null;
  bathrooms: number | null;
  minSize: number | null;
  maxSize: number | null;
}

export function PropertyFeaturesGrid({
  bedrooms,
  bathrooms,
  minSize,
  maxSize,
}: PropertyFeaturesGridProps) {
  const formatBedrooms = (beds: number | null) => {
    if (beds === null || beds === undefined) return 'N/A';
    return beds === 0 ? 'Studio' : beds.toString();
  };

  const isStudio = bedrooms === 0;

  return (
    <div className="flex gap-3 items-center justify-between rounded-xl bg-muted/50 p-1.5 text-sm border border-border/40">
      <PropertyFeatureItem
        value={formatBedrooms(bedrooms)}
        label={!isStudio ? 'Beds' : 'Studio'}
        className="basis-1/2"
      />

      <PropertyFeatureItem
        value={bathrooms?.toString() || 'N/A'}
        label="Baths"
        hasBorder
        className="basis-1/2"
      />

      <PropertyFeatureItem
        className="basis-1/2"
        value={
          minSize
            ? `${formatToThousands(minSize)} - ${maxSize ? formatToThousands(maxSize) : 'N/A'}`
            : 'N/A'
        }
        label="Sq Ft"
      />
    </div>
  );
}
