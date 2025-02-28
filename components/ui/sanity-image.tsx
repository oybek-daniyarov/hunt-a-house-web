import Image, { type ImageProps } from 'next/image';

import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';

interface SanityImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  image?: Sanity.Image | null;
  alt?: string;
  className?: string;
  fill?: boolean;
}

export function SanityImage({
  image,
  alt = '',
  className,
  fill = false,
  width,
  height,
  ...props
}: SanityImageProps) {
  const imageBuilder = urlFor(image);

  if (!imageBuilder) {
    return null;
  }

  const title = alt || image?.alt;

  if (!title) {
    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Alt text is missing</p>
        </div>
      </div>
    );
  }

  // Chain width and height to the URL if they're provided and are numbers
  const imageUrl =
    !fill && typeof width === 'number' && typeof height === 'number'
      ? imageBuilder.width(width).height(height).url()
      : imageBuilder.url();

  if (!imageUrl) {
    return null;
  }

  const defaultSizes = fill
    ? '100vw' // Full-width images
    : '(min-width: 1280px) 50vw, (min-width: 1024px) 66vw, (min-width: 768px) 75vw, 100vw'; // Responsive images

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        fill ? 'h-full w-full' : '',
        className
      )}
    >
      <Image
        src={imageUrl}
        alt={title}
        unoptimized={image?.mimeType === 'image/svg+xml'}
        {...(!fill
          ? {
              width: width ?? image?.dimensions?.width ?? 1920,
              height: height ?? image?.dimensions?.height ?? 1080,
              sizes: props.sizes ?? defaultSizes,
            }
          : {
              fill: true,
              sizes: props.sizes ?? defaultSizes,
            })}
        {...(image?.blurData && {
          placeholder: 'blur',
          blurDataURL: image.blurData,
        })}
        {...props}
      />
    </div>
  );
}
