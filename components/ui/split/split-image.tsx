import { SanityImage } from '@/components/ui/sanity-image';

export default function SplitImage({
  image,
}: Partial<{
  image: Sanity.Image;
}>) {
  return image ? (
    <div className="relative h-[25rem] sm:h-[30rem] md:h-[25rem] lg:h-full rounded-lg overflow-hidden">
      <SanityImage image={image} fill />
    </div>
  ) : null;
}
