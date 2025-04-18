import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'site',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'branding', default: true },
    { name: 'info' },
    { name: 'navigation' },
    { name: 'listing', title: 'Listing Management' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'branding',
    }),
    defineField({
      name: 'tagline',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'branding',
    }),
    defineField({
      name: 'logo',
      type: 'logo',
      group: 'branding',
    }),
    defineField({
      name: 'announcements',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'announcement' }] }],
      group: 'info',
    }),
    defineField({
      name: 'copyright',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
        },
      ],
      group: 'info',
    }),
    defineField({
      name: 'ctas',
      title: 'Call-to-action (global)',
      description: 'Typically used in the header and/or footer.',
      type: 'array',
      of: [{ type: 'cta' }],
      group: 'navigation',
    }),
    defineField({
      name: 'headerMenu',
      type: 'reference',
      to: [{ type: 'navigation' }],
      group: 'navigation',
    }),
    defineField({
      name: 'footerMenu',
      type: 'reference',
      to: [{ type: 'navigation' }],
      group: 'navigation',
    }),
    defineField({
      name: 'social',
      type: 'reference',
      to: [{ type: 'navigation' }],
      group: 'navigation',
    }),
    defineField({
      name: 'listingGuestDialog',
      title: 'Listing Guest Dialog',
      type: 'object',
      group: 'listing',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Dialog Title',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          type: 'text',
          title: 'Dialog Subtitle',
          validation: (Rule) => Rule.required(),
          rows: 3,
        }),
        defineField({
          name: 'features',
          type: 'array',
          title: 'Features',
          validation: (Rule) => Rule.required().max(4).min(1),
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  type: 'string',
                  title: 'Feature Title',
                }),
                defineField({
                  name: 'description',
                  type: 'string',
                  title: 'Feature Description',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Site settings',
    }),
  },
});
