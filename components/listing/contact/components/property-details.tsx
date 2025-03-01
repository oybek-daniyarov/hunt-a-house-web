import { BanknoteIcon, Bath, BedSingle, Ruler } from 'lucide-react';

import { formatCurrency, formatSize } from '@/lib/utils/format-number';

interface PropertyDetailsProps {
  listing: App.Data.Lead.LeadListData;
}

const propertyDetails = [
  {
    icon: BedSingle,
    label: 'Bedrooms',
    value: (listing: App.Data.Lead.LeadListData) =>
      listing.bedrooms === 0 ? 'Studio' : listing.bedrooms || 'N/A',
  },
  {
    icon: Bath,
    label: 'Bathrooms',
    value: (listing: App.Data.Lead.LeadListData) => listing.bathrooms || 'N/A',
  },
  {
    icon: Ruler,
    label: 'Size',
    value: (listing: App.Data.Lead.LeadListData) =>
      listing.minSize && listing.maxSize
        ? `${formatSize(listing.minSize)} - ${formatSize(listing.maxSize)}`
        : listing.minSize
          ? formatSize(listing.minSize)
          : 'Not specified',
  },
  {
    icon: BanknoteIcon,
    label: 'Budget',
    value: (listing: App.Data.Lead.LeadListData) =>
      listing.minBudget && listing.maxBudget
        ? `${formatCurrency(listing.minBudget)} - ${formatCurrency(listing.maxBudget)}`
        : listing.minBudget
          ? formatCurrency(listing.minBudget)
          : 'Not specified',
    suffix: (listing: App.Data.Lead.LeadListData) =>
      listing.budgetFrequency
        ? ` ${listing.budgetFrequency.replace('_', ' ')}`
        : '',
  },
];

export function PropertyDetails({ listing }: PropertyDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {propertyDetails.slice(0, 2).map(({ icon: Icon, label, value }) => (
          <div key={label} className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </div>
            <p className="font-medium">{value(listing)}</p>
          </div>
        ))}
      </div>

      {propertyDetails.slice(2).map(({ icon: Icon, label, value, suffix }) => (
        <div key={label} className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </div>
          <p className="font-medium">
            {value(listing)}
            {suffix?.(listing)}
          </p>
        </div>
      ))}
    </div>
  );
}
