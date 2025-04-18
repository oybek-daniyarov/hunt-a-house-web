import { stegaClean } from 'next-sanity';

import PortableTextRenderer from '@/components/portable-text-renderer';
import { Button } from '@/components/ui/button';
import SanityLink from '@/components/ui/sanity-link';
import SectionContainer, {
  ISectionContainer,
  ISectionPadding,
} from '@/components/ui/section-container';
import { cn } from '@/lib/utils';

export default function Cta1({
  padding,
  colorVariant,
  sectionWidth = 'default',
  stackAlign = 'left',
  tagLine,
  title,
  body,
  links,
}: Partial<{
  padding: ISectionPadding;
  colorVariant: ISectionContainer['color'];
  stackAlign: 'left' | 'center';
  sectionWidth: 'default' | 'narrow';
  tagLine: string;
  title: string;
  body: any;
  links: Sanity.Link[];
}>) {
  const isNarrow = stegaClean(sectionWidth) === 'narrow';
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      <div
        className={cn(
          align === 'center' ? 'max-w-[48rem] text-center mx-auto' : undefined,
          isNarrow ? 'max-w-[48rem] mx-auto' : undefined
        )}
      >
        <div
          className={cn(color === 'primary' ? 'text-background' : undefined)}
        >
          {tagLine && (
            <h1 className="leading-[0] mb-4">
              <span className="text-base font-semibold">{tagLine}</span>
            </h1>
          )}
          <h2 className="mb-4">{title}</h2>
          {body && <PortableTextRenderer value={body} />}
        </div>
        {links && links.length > 0 && (
          <div
            className={cn(
              'mt-10 flex flex-wrap gap-4',
              align === 'center' ? 'justify-center' : undefined
            )}
          >
            {links &&
              links.length > 0 &&
              links.map((link) => (
                <Button
                  key={link._key}
                  variant={stegaClean(link?.buttonVariant)}
                  asChild
                >
                  <SanityLink link={link} />
                </Button>
              ))}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
