import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { BookOpen, Files, ListCollapse, Quote } from 'lucide-react';
import { BsDatabaseAdd } from 'react-icons/bs';
import { VscServerProcess } from 'react-icons/vsc';

import { group, singleton } from '@/sanity/lib/utils';

export const structure = (S: any, context: any) =>
  S.list()
    .title('Content')
    .items([
      singleton(S, 'site', 'Site settings').icon(VscServerProcess),
      S.divider(),
      orderableDocumentListDeskItem({
        type: 'page',
        title: 'Pages',
        icon: Files,
        S,
        context,
      }),
      group(S, 'Press & Media', [
        S.documentTypeListItem('post').title('Posts'),
        S.documentTypeListItem('category').title('Categories'),
        S.documentTypeListItem('author').title('Authors'),
      ]).icon(BookOpen),
      S.listItem()
        .title('Navigation')
        .schemaType('navigation')
        .child(
          S.documentTypeList('navigation')
            .title('Navigation')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }]) // Default ordering
        ),
      S.divider(),
      group(S, 'Miscellaneous', [
        S.documentTypeListItem('announcement').title('Announcements'),
        S.documentTypeListItem('logo').title('Logos'),
        orderableDocumentListDeskItem({
          type: 'testimonial',
          title: 'Testimonials',
          icon: Quote,
          S,
          context,
        }),
        orderableDocumentListDeskItem({
          type: 'faq',
          title: 'FAQs',
          icon: ListCollapse,
          S,
          context,
        }),
      ]).icon(BsDatabaseAdd),
    ]);
