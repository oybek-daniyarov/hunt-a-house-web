import { formatNumber } from '@/lib/utils/format-number';
import Preview from '../components/preview';
import { usePropertyForm } from '../providers/property-form-provider';

function formatSize(min: number | null, max: number | null) {
  if (!min && !max) return 'Not specified';

  return [
    min && `${formatNumber(min)} sqft`,
    max && `${formatNumber(max)} sqft`,
  ]
    .filter(Boolean)
    .join(' - ');
}

const PropertyPreviewSection = () => {
  const { getValue, findName } = usePropertyForm();
  const type = getValue('listing.type', 'Not specified');
  const activity = getValue('listing.activity', 'Not specified');
  const size = getValue('listing.size', { min: null, max: null });

  return (
    <Preview>
      <Preview.Row title="Type" value={findName('propertyTypes', type)} />
      <Preview.Row
        title="Activity"
        value={findName('activityTypes', activity)}
      />
      <Preview.Row title="Size" value={formatSize(size.min, size.max)} />
    </Preview>
  );
};

export default PropertyPreviewSection;
