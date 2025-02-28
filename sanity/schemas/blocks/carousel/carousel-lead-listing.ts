import { GalleryHorizontal } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'carousel-lead-listing',
  title: 'Carousel Lead Listing',
  type: 'object',
  icon: GalleryHorizontal,
  description: 'An infinite scrolling lead listing marquee with multiple rows',
  fields: [
    defineField({
      name: 'padding',
      type: 'section-padding',
    }),
    defineField({
      name: 'colorVariant',
      type: 'color-variant',
      title: 'Color Variant',
      description: 'Select a background color variant',
    }),
    defineField({
      name: 'speed',
      type: 'number',
      title: 'Speed',
      description: 'Speed of the marquee (pixels per second)',
      initialValue: 50,
      validation: (Rule) => Rule.required().min(1).max(200),
    }),
    defineField({
      name: 'pauseOnHover',
      type: 'boolean',
      title: 'Pause on Hover',
      description: 'Pause the marquee when hovering over it',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'colorVariant',
    },
    prepare({ title }) {
      return {
        title: 'Carousel (Lead Marquee)',
        subtitle: title,
      };
    },
  },
});
