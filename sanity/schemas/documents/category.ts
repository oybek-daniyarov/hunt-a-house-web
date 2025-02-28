import { orderRankField } from '@sanity/orderable-document-list';
import { BookA } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: BookA,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    orderRankField({ type: 'category' }),
  ],
});
