import { VscLink } from 'react-icons/vsc';
import { defineField, defineType } from 'sanity';

import resolveUrl, {
  PAGE_TYPES,
  type PageType,
} from '@/sanity/lib/resolve-url';

export default defineType({
  name: 'link',
  title: 'Link',
  icon: VscLink,
  type: 'object',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'style', title: 'Style' },
  ],
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'internal', value: 'internal' },
          { title: 'external', value: 'external' },
        ],
      },
      group: 'content',
    }),
    defineField({
      name: 'internal',
      type: 'reference',
      to: PAGE_TYPES.map((type) => ({ type })),
      hidden: ({ parent }) => parent?.type !== 'internal',
      group: 'content',
    }),
    defineField({
      name: 'external',
      placeholder: 'https://example.com',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
          allowRelative: true,
        }),
      hidden: ({ parent }) => parent?.type !== 'external',
      group: 'content',
    }),
    defineField({
      name: 'params',
      title: 'URL parameters',
      placeholder: 'e.g. #jump-link or ?foo=bar',
      type: 'string',
      hidden: ({ parent }) => parent?.type !== 'internal',
      group: 'content',
    }),
    defineField({
      name: 'newTab',
      type: 'boolean',
      title: 'New Tab',
      description: 'Open the link in a new tab',
      group: 'style',
    }),
    defineField({
      name: 'buttonVariant',
      type: 'button-variant',
      title: 'Button Variant',
      description: 'Select a button variant',
      group: 'style',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      _type: 'internal._type',
      title: 'internal.title',
      slug: 'internal.slug.current',
      external: 'external',
      type: 'type',
    },
    prepare: ({ label, title, _type, slug, external, type }) => {
      const subtitle =
        type === 'internal'
          ? resolveUrl(_type as PageType, slug)
          : external.replace(/^https?:\/\//, '');
      return {
        title: label || title,
        subtitle,
      };
    },
  },
});
