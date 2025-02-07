import { Badge } from '@/components/ui/badge';
import Preview from '../components/preview';
import { usePropertyForm } from '../providers/property-form-provider';

const SummaryPreviewSection = () => {
  const { getValue } = usePropertyForm();
  const content = getValue('content', {
    userAd: '',
    locationSummary: '',
    originalQuery: '',
    tags: [],
  });

  return (
    <Preview>
      <Preview.Row
        column={false}
        title="Original query"
        value={content.originalQuery}
      />
      <Preview.Row
        column={false}
        title="Generated Enquiry"
        value={content.userAd}
      />
      <Preview.Row
        column={false}
        title="Location Summary"
        value={content.locationSummary}
      />
      <Preview.Row
        column={false}
        title="Tags"
        value={
          <div className="flex flex-wrap gap-2">
            {content.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        }
      />
    </Preview>
  );
};

export default SummaryPreviewSection;
