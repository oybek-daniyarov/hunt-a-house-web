import { FormInput } from 'lucide-react';
import { defineField, defineType } from 'sanity';

import { SECTION_WIDTH, STACK_ALIGN } from '../shared/layout-variants';

export default defineType({
  name: 'split-form',
  title: 'Split Form',
  type: 'object',
  icon: FormInput,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'style', title: 'Style' },
  ],
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
      name: 'formType',
      title: 'Form Type',
      type: 'string',
      options: {
        list: [
          { title: 'Agent Form', value: 'agent' },
          { title: 'Client Form', value: 'client' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'tagLine',
      title: 'Tagline',
      type: 'string',
      description: 'A short text that appears above the title',
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The large text that is the primary focus of the block',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'block-content',
      description: 'The main content text',
      group: 'content',
    }),
    defineField({
      name: 'link',
      type: 'link',
      description:
        'Link to a page or external URL. Leave empty to hide the link.',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      formType: 'formType',
    },
    prepare({ title, formType }) {
      return {
        title: title || 'Split Form',
        subtitle: `${formType === 'agent' ? 'Agent' : 'Client'} Form`,
      };
    },
  },
});
