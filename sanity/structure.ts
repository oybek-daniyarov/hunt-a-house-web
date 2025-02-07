import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { BookA, Files, ListCollapse, Quote, User } from 'lucide-react';
import { Iframe, UrlResolver } from 'sanity-plugin-iframe-pane';

const getPreviewUrl: UrlResolver = () => {
  return `${process.env.NEXT_PUBLIC_SITE_URL}/preview/search`;
};

export const structure = (S: any, context: any) =>
  S.list()
    .title('Content')
    .items([
      orderableDocumentListDeskItem({
        type: 'page',
        title: 'Pages',
        icon: Files,
        S,
        context,
      }),
      S.listItem()
        .title('Posts')
        .schemaType('post')
        .child(
          S.documentTypeList('post')
            .title('Post')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }]) // Default ordering
        ),
      orderableDocumentListDeskItem({
        type: 'category',
        title: 'Categories',
        icon: BookA,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'author',
        title: 'Authors',
        icon: User,
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
      orderableDocumentListDeskItem({
        type: 'testimonial',
        title: 'Testimonials',
        icon: Quote,
        S,
        context,
      }),
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
