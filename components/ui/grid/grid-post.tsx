import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { SanityImage } from '@/components/ui/sanity-image';
import { cn } from '@/lib/utils';
import { Badge } from '../badge';

interface GridPostProps {
  color:
    | 'primary'
    | 'secondary'
    | 'card'
    | 'accent'
    | 'destructive'
    | 'background'
    | 'transparent';
  title: string;
  slug: Sanity.Post['slug'];
  categories: Sanity.Category[];
  excerpt: string;
  image: Sanity.Image;
}

export default function GridPost({
  color,
  title,
  slug,
  excerpt,
  image,
  categories,
}: GridPostProps) {
  return (
    <Link
      key={title}
      className="flex w-full rounded-3xl ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group"
      href={slug.current ? `/blog/${slug.current}` : '#'}
    >
      <div
        className={cn(
          'flex w-full flex-col justify-between overflow-hidden transition ease-in-out group border rounded-3xl p-4 hover:border-primary',
          color === 'primary'
            ? 'group-hover:border-primary-foreground/50'
            : 'group-hover:border-primary'
        )}
      >
        <div className="flex flex-col">
          {image && (
            <div className="mb-4 relative h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[9.5rem] xl:h-[12rem] rounded-2xl overflow-hidden">
              <SanityImage image={image} fill quality={100} />
            </div>
          )}
          {title && (
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[1.5rem] leading-[1.2]">{title}</h3>
            </div>
          )}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category, index) => (
                <Badge key={index} color="primary">
                  {category.title}
                </Badge>
              ))}
            </div>
          )}
          {excerpt && <p>{excerpt}</p>}
        </div>
        <div className="mt-3 xl:mt-6 w-10 h-10 border rounded-full flex items-center justify-center group-hover:border-primary">
          <ChevronRight
            className="text-border group-hover:text-primary"
            size={24}
          />
        </div>
      </div>
    </Link>
  );
}
