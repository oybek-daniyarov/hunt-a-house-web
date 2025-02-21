import { BarChart } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

import {
  SECTION_WIDTH,
  STACK_ALIGN,
} from '@/sanity/schemas/blocks/shared/layout-variants';

export default defineType({
  name: 'stats',
  title: 'Stats Block',
  type: 'object',
  icon: BarChart,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'style', title: 'Style' },
  ],
  description: 'A block to display key metrics and statistics',
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
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          name: 'stat',
          title: 'Statistic',
          type: 'object',
          fieldsets: [
            { name: 'value', title: 'Value', options: { columns: 3 } },
          ],
          fields: [
            defineField({
              name: 'prefix',
              title: 'Prefix',
              type: 'string',
              description: 'Optional prefix before the value (e.g. "$", "€")',
              fieldset: 'value',
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'The main statistic value (e.g. "90", "2M", "24/7")',
              fieldset: 'value',
            }),
            defineField({
              name: 'suffix',
              title: 'Suffix',
              type: 'string',
              description: 'Optional suffix after the value (e.g. "%", "+")',
              fieldset: 'value',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Description of what the statistic represents',
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1).max(6),
    }),
  ],
  preview: {
    select: {
      stats: 'stats',
    },
    prepare({ stats = [] }) {
      return {
        title: 'Stats Block',
        subtitle: `${stats.length} statistic${stats.length === 1 ? '' : 's'}`,
      };
    },
  },
});
