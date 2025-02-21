import { GalleryHorizontal } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'carousel-3',
  title: 'Carousel 3 (Testimonial Marquee)',
  type: 'object',
  icon: GalleryHorizontal,
  description: 'An infinite scrolling testimonial marquee with multiple rows',
  fields: [
    defineField({
      name: 'padding',
      type: 'section-padding',
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
    defineField({
      name: 'rows',
      type: 'array',
      title: 'Marquee Rows',
      description: 'Add up to 3 rows of testimonials',
      validation: (Rule) => Rule.max(3),
      of: [
        {
          type: 'object',
          name: 'row',
          fields: [
            {
              name: 'testimonials',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{ type: 'testimonial' }],
                },
              ],
            },
          ],
          preview: {
            select: {
              testimonial0: 'testimonials.0.name',
              testimonial1: 'testimonials.1.name',
            },
            prepare({ testimonial0, testimonial1 }) {
              return {
                title: [testimonial0, testimonial1].filter(Boolean).join(', '),
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'rows.0.testimonials.0.name',
    },
    prepare({ title }) {
      return {
        title: 'Testimonial Marquee',
        subtitle: title,
      };
    },
  },
});
