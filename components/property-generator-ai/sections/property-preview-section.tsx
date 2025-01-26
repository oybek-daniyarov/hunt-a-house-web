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
  const { getValue } = usePropertyForm();
  const type = getValue('property.type', 'Not specified');
  const activity = getValue('property.activity', 'Not specified');
  const size = getValue('property.size', { min: null, max: null });

  return (
    <Preview>
      <Preview.Row title="Type" value={type} />
      <Preview.Row title="Activity" value={activity} />
      <Preview.Row title="Size" value={formatSize(size.min, size.max)} />
    </Preview>
  );
};

export default PropertyPreviewSection;
