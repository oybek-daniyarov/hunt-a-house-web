import { Text } from 'lucide-react';
import { defineField, defineType } from 'sanity';

import { SECTION_WIDTH } from './shared/layout-variants';

export default defineType({
  name: 'content',
  type: 'object',
  title: 'Content',
  description: 'A block of rich text content with customizable layout options',
  icon: Text,
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
      name: 'sectionWidth',
      type: 'string',
      title: 'Section Width',
      options: {
        list: SECTION_WIDTH.map(({ title, value }) => ({ title, value })),
        layout: 'radio',
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'body',
      type: 'block-content',
      title: 'Content',
      description: 'Rich text content with formatting options',
    }),
  ],
  preview: {
    select: {
      content: 'body',
    },
    prepare({ content }) {
      return {
        title: 'Content Block',
        subtitle: content?.[0]?.children?.[0]?.text || 'No content',
      };
    },
  },
});
