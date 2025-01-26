import { Badge } from '@/components/ui/badge';
import Preview from '../components/preview';
import { usePropertyForm } from '../providers/property-form-provider';

const SummaryPreviewSection = () => {
  const { getValue } = usePropertyForm();
  const content = getValue('content', {
    title: '',
    description: '',
    tags: [],
  });
  const seo = getValue('seo', {
    title: '',
    description: '',
  });

  return (
    <Preview>
      <Preview.Row column={false} title="Title" value={content.title} />
      <Preview.Row
        column={false}
        title="Description"
        value={content.description}
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
