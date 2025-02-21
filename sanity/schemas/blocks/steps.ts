import { ListOrdered } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

import {
  SECTION_WIDTH,
  STACK_ALIGN,
} from '@/sanity/schemas/blocks/shared/layout-variants';

export default defineType({
  name: 'steps',
  title: 'Steps Block',
  type: 'object',
  icon: ListOrdered,
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'style', title: 'Style' },
  ],
  description:
    'A block to display a series of steps or processes, perfect for How It Works sections or similar step-by-step explanations',
  fields: [
    defineField({
      name: 'padding',
      type: 'section-padding',
      group: 'style',
    }),
    defineField({
      name: 'colorVariant',
      type: 'color-variant',
      title: 'Color Variant',
      description: 'Select a background color variant',
      group: 'style',
    }),
    defineField({
      name: 'sectionWidth',
      type: 'string',
      title: 'Section Width',
      options: {
        list: SECTION_WIDTH.map(({ title, value }) => ({ title, value })),
        layout: 'radio',
      },
      initialValue: 'default',
      group: 'style',
    }),
    defineField({
      name: 'stackAlign',
      type: 'string',
      title: 'Stack Layout Alignment',
      options: {
        list: STACK_ALIGN.map(({ title, value }) => ({ title, value })),
        layout: 'radio',
      },
      initialValue: 'left',
      group: 'style',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The large text that is the primary focus of the block',
      group: 'content',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description:
        'A brief description that provides context about these steps',
      group: 'content',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      description: 'Add the individual steps or processes',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          name: 'step',
          title: 'Step',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
              description: 'The title of this step',
            }),
            defineField({
              name: 'description',
              title: 'Step Description',
              type: 'text',
              rows: 2,
              description: 'A brief description of what happens in this step',
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1).max(6),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      stepsCount: 'steps.length',
    },
    prepare({ title, subtitle, stepsCount = 0 }) {
      return {
        title: title || 'Steps Block',
        subtitle: `${stepsCount} step${stepsCount === 1 ? '' : 's'} - ${subtitle || ''}`,
      };
    },
  },
});
