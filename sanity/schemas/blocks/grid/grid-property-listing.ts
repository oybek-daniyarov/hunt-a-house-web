import { LayoutGrid } from 'lucide-react';
import { defineField, defineType } from 'sanity';

import { COLS_VARIANTS } from '../shared/layout-variants';

export default defineType({
  name: 'grid-property-listing',
  title: 'Grid Property Listing',
  type: 'object',
  icon: LayoutGrid,
  groups: [
    { name: 'style', title: 'Style', default: true },
    { name: 'settings', title: 'Settings' },
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
      name: 'gridColumns',
      type: 'string',
      title: 'Grid Columns',
      options: {
        list: COLS_VARIANTS.map(({ title, value }) => ({ title, value })),
        layout: 'radio',
      },
      initialValue: 'grid-cols-3',
      group: 'settings',
    }),
    defineField({
      name: 'perPage',
      title: 'Items Per Page',
      type: 'number',
      description: 'Number of properties to show per page',
      initialValue: 9,
      validation: (Rule) => Rule.required().min(3).max(24),
      group: 'settings',
    }),
    defineField({
      name: 'filters',
      title: 'Enable Filters',
      type: 'object',
      group: 'settings',
      description:
        'Enable filters to filter properties by property type, price, activity type, bedrooms, bathrooms, location, and amenities',
      options: {
        columns: 3,
      },
      fields: [
        defineField({
          name: 'propertyType',
          title: 'Property Type Filter',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'price',
          title: 'Price Range Filter',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'activityType',
          title: 'Activity Type Filter',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'bedrooms',
          title: 'Bedrooms Filter',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'bathrooms',
          title: 'Bathrooms Filter',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'location',
          title: 'Location Filter',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'sortOptions',
      title: 'Sort Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              options: {
                list: [
                  { title: 'Newest First', value: 'newest' },
                  { title: 'Oldest First', value: 'oldest' },
                  { title: 'Price (Low to High)', value: 'price-asc' },
                  { title: 'Price (High to Low)', value: 'price-desc' },
                  { title: 'Size (Small to Large)', value: 'size-asc' },
                  { title: 'Size (Large to Small)', value: 'size-desc' },
                ],
              },
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.unique().min(1),
      initialValue: [
        { label: 'Newest First', value: 'newest' },
        { label: 'Price (Low to High)', value: 'price-asc' },
        { label: 'Price (High to Low)', value: 'price-desc' },
      ],
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      perPage: 'perPage',
    },
    prepare({ perPage }) {
      return {
        title: 'Property Grid',
        subtitle: `${perPage} items per page`,
      };
    },
  },
});
