import { orderRankField } from '@sanity/orderable-document-list';
import { Files } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  icon: Files,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    defineField({ name: 'title', type: 'string', group: 'content' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'blocks',
      type: 'array',
      group: 'content',
      of: [
        { type: 'hero-1' },
        { type: 'hero-2' },
        { type: 'section-header' },
        { type: 'content' },
        { type: 'split-row' },
        { type: 'split-form' },
        { type: 'grid-row' },
        { type: 'grid-property-listing' },
        { type: 'carousel-1' },
        { type: 'carousel-2' },
        { type: 'carousel-3' },
        { type: 'timeline-row' },
        { type: 'cta-1' },
        { type: 'logo-cloud-1' },
        { type: 'faqs' },
        { type: 'form-newsletter' },
        { type: 'steps' },
        { type: 'stats' },
        { type: 'features' },
      ],
    }),
    defineField({
      name: 'meta_title',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'meta_description',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
    }),
    defineField({
      name: 'noindex',
      title: 'No Index',
      type: 'boolean',
      initialValue: false,
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image - [1200x630]',
      type: 'image',
      group: 'seo',
    }),
    orderRankField({ type: 'page' }),
  ],
});
