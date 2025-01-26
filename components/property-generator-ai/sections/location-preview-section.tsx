import Preview from '@/components/property-generator-ai/components/preview';
import { usePropertyForm } from '../providers/property-form-provider';

const LocationPreviewSection = () => {
  const { getValue } = usePropertyForm();
  const emirate = getValue('location.emirate', '');
  const areas = getValue('location.areas', []);
  const communities = getValue('location.communities', []);

  return (
    <Preview>
      <Preview.Row title="Emirate" value={emirate || 'Not specified'} />
      <Preview.Row
        title="Areas"
        value={areas.length ? areas.join(', ') : 'Not specified'}
      />
      <Preview.Row
        title="Communities"
        value={communities.length ? communities.join(', ') : 'Not specified'}
      />
    </Preview>
  );
};

export default LocationPreviewSection;
