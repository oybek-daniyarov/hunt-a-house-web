import Preview from '@/components/property-generator-ai/components/preview';
import { usePropertyForm } from '../providers/property-form-provider';

const LocationPreviewSection = () => {
  const { getValue } = usePropertyForm();
  const emirate = getValue('location.emirateName', '');
  const communities = getValue('location.materializedPath', '');

  return (
    <Preview>
      <Preview.Row title="Emirate" value={emirate || 'Not specified'} />
      <Preview.Row title="Communities" value={communities || 'Not specified'} />
    </Preview>
  );
};

export default LocationPreviewSection;
