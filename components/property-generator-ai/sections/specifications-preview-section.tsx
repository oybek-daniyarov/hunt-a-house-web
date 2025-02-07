import Preview from '../components/preview';
import { usePropertyForm } from '../providers/property-form-provider';

const SpecificationsPreviewSection = () => {
  const { getValue } = usePropertyForm();
  const bedrooms = getValue('listing.bedrooms', 1);
  const bathrooms = getValue('listing.bathrooms', 1);

  return (
    <Preview>
      <Preview.Row title="Bedrooms" value={bedrooms.toString()} />
      <Preview.Row title="Bathrooms" value={bathrooms.toString()} />
    </Preview>
  );
};

export default SpecificationsPreviewSection;
