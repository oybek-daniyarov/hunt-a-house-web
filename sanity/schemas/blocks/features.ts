import { ListChecks } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

import {
  SECTION_WIDTH,
  STACK_ALIGN,
} from '@/sanity/schemas/blocks/shared/layout-variants';

export default defineType({
  name: 'features',
  title: 'Features Block',
  type: 'object',
  icon: ListChecks,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'style', title: 'Style' },
  ],
  description: 'A block to display key features or benefits',
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
      initialValue: 'center',
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
      description: 'A brief description that provides context',
      group: 'content',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          name: 'feature',
          title: 'Feature',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'The main feature title',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
              description: 'A brief subtitle or tagline',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: 'Detailed description of the feature',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Icon name from Lucide icons',
              options: {
                list: [
                  { title: 'Users (People)', value: 'Users' },
                  { title: 'Star (Top Rated)', value: 'Star' },
                  { title: 'User Check (Personalized)', value: 'UserCheck' },
                  { title: 'Sparkles (Seamless)', value: 'Sparkles' },
                  { title: 'Bar Chart (Market)', value: 'BarChart2' },
                  { title: 'Medal (Achievement)', value: 'Medal' },
                  { title: 'Target (Goals)', value: 'Target' },
                  { title: 'Lightning (Fast)', value: 'Zap' },
                  { title: 'Trending Up (Growth)', value: 'TrendingUp' },
                  { title: 'Layers (Stack)', value: 'Layers' },
                  { title: 'Line Chart (Analytics)', value: 'LineChart' },
                ],
              },
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
      features: 'features',
    },
    prepare({ title, features = [] }) {
      return {
        title: title || 'Features Block',
        subtitle: `${features.length} feature${features.length === 1 ? '' : 's'}`,
      };
    },
  },
});
