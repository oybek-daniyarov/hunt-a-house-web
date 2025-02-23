import { PortableText } from '@portabletext/react';

import { cn } from '@/lib/utils';
import { type Content } from '@/types/sanity';

interface ContentProps {
  data: Content;
}

export function Content({ data }: ContentProps) {
  const { body, colorVariant, sectionWidth, padding } = data;

  return (
    <section className={cn('my-8 px-4', colorVariant?.className)}>
      <div className={cn('py-8', padding?.className)}>
        <div
          className={cn('mx-auto', {
            'max-w-7xl': sectionWidth === 'default',
            'max-w-5xl': sectionWidth === 'narrow',
            'max-w-3xl': sectionWidth === 'compact',
          })}
        >
          <div className="prose prose-lg dark:prose-invert">
            <PortableText value={body} />
          </div>
        </div>
      </div>
    </section>
  );
}
