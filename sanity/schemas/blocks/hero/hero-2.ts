import { LayoutTemplate } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'hero-2',
  title: 'Hero 2',
  type: 'object',
  icon: LayoutTemplate,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'style', title: 'Style' },
  ],
  fields: [
    defineField({
      name: 'height',
      title: 'Section Height',
      type: 'string',
      options: {
        list: [
          { title: 'Full Screen', value: 'full' },
          { title: 'Half Screen', value: 'half' },
        ],
        layout: 'radio',
      },
      initialValue: 'half',
      group: 'style',
    }),
    defineField({
      name: 'tagLine',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'body',
      type: 'block-content',
      group: 'content',
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [{ type: 'link' }],
      validation: (rule) => rule.max(2),
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Hero 2',
        subtitle: title,
      };
    },
  },
});
