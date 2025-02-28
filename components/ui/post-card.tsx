import { ChevronRight } from 'lucide-react';

import { SanityImage } from '@/components/ui/sanity-image';
import { cn } from '@/lib/utils';

export default function PostCard({
  className,
  title,
  excerpt,
  image,
}: Partial<{
  className: string;
  title: string;
  excerpt: string;
  image: Sanity.Image;
}>) {
  return (
    <div
      className={cn(
        'flex w-full flex-col justify-between overflow-hidden transition ease-in-out group border rounded-3xl p-4 hover:border-primary',
        className
      )}
    >
      <div className="flex flex-col">
        {image && (
          <div className="mb-4 relative h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[9.5rem] xl:h-[12rem] rounded-2xl overflow-hidden">
            <SanityImage image={image} />
          </div>
        )}
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[1.5rem] leading-[1.2]">{title}</h3>
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
  );
}
