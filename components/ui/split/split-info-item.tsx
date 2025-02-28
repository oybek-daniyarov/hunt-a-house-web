'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

import PortableTextRenderer from '@/components/portable-text-renderer';
import { Badge } from '@/components/ui/badge';
import { SanityImage } from '@/components/ui/sanity-image';
import { cn } from '@/lib/utils';

interface SplitInfoItemProps {
  image: Sanity.Image;
  title: string;
  body: any;
  tags: string[];
}

export default function SplitCardsItem({
  image,
  title,
  body,
  tags,
}: Partial<SplitInfoItemProps>) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 1,
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        'border border-primary rounded-3xl px-6 lg:px-8 py-6 lg:py-8 transition-colors duration-1000 ease-in-out',
        isInView ? 'bg-foreground/85' : 'bg-background'
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-4 transition-colors duration-1000 ease-in-out',
          isInView ? 'text-background' : 'text-foreground'
        )}
      >
        <div className="flex items-center gap-2">
          {image && (
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
              <SanityImage height={40} image={image} />
            </div>
          )}
          {title && (
            <div className="text-xl font-semibold leading-[1.1]">{title}</div>
          )}
        </div>
        {body && <PortableTextRenderer value={body} />}
      </div>
      {tags && (
        <div
          className={cn(
            'flex flex-wrap gap-3 mt-4 transition-colors duration-1000 ease-in-out',
            isInView ? 'text-background' : 'text-foreground'
          )}
        >
          {tags.map((tag) => (
            <Badge
              key={tag}
              className={cn(
                'transition-colors duration-1000 ease-in-out',
                isInView
                  ? 'bg-background text-foreground'
                  : 'bg-foreground text-background'
              )}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </motion.div>
  );
}
