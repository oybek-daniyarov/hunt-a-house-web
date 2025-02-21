import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { BookOpen, Files, ListCollapse, Quote } from 'lucide-react';
import { BsDatabaseAdd } from 'react-icons/bs';
import { VscServerProcess } from 'react-icons/vsc';
import { Iframe, UrlResolver } from 'sanity-plugin-iframe-pane';

import { group, singleton } from '@/sanity/lib/utils';

const getPreviewUrl: UrlResolver = () => {
  return `${process.env.NEXT_PUBLIC_SITE_URL}/preview/search`;
};

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

      S.divider(),

      S.listItem()
        .title('AI Agents')
        .schemaType('agent')
        .child(
          S.documentTypeList('agent')
            .title('AI Agents')
            .child((documentId: string) =>
              S.document()
                .documentId(documentId)
                .schemaType('agent')
                .views([
                  S.view.form(),
                  S.view
                    .component(Iframe)
                    .options({
                      url: getPreviewUrl,
                      reload: {
                        button: true,
                        revision: true,
                      },
                      attributes: {
                        allow: 'fullscreen',
                        height: '100%',
                        width: '100%',
                      },
                    })
                    .title('Preview'),
                ])
            )
        ),
    ]);
