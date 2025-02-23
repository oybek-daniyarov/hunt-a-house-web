import { stegaClean } from 'next-sanity';

import PortableTextRenderer from '@/components/portable-text-renderer';
import SectionContainer, {
  ISectionContainer,
  ISectionPadding,
} from '@/components/ui/section-container';
import { cn } from '@/lib/utils';

interface ContentProps {
  padding: ISectionPadding;
  colorVariant: ISectionContainer['color'];
  sectionWidth?: 'default' | 'narrow' | 'compact';
  body: any;
}

export default function Content({
  padding,
  colorVariant,
  sectionWidth = 'default',
  body,
}: ContentProps) {
  const color = stegaClean(colorVariant);
  const width = stegaClean(sectionWidth);

  return (
    <SectionContainer color={color} padding={padding}>
      <div
        className={cn('mx-auto', {
          'max-w-7xl': width === 'default',
          'max-w-5xl': width === 'narrow',
          'max-w-3xl': width === 'compact',
        })}
      >
        {body && <PortableTextRenderer value={body} />}
      </div>
    </SectionContainer>
  );
}
