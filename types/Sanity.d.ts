import type {
  SanityImageDimensions,
  SanityImageObject,
} from '@sanity/image-url/lib/types/types';
import type { SanityDocument } from 'next-sanity';

declare global {
  namespace Sanity {
    interface Site extends SanityDocument {
      // branding
      title: string;
      tagline?: any;
      logo?: Logo;
      // info
      announcements?: Announcement[];
      copyright?: any;
      ogimage?: string;
      // navigation
      ctas?: CTA[];
      headerMenu?: Navigation;
      footerMenu?: Navigation;
      social?: Navigation;
    }

    interface Navigation extends SanityDocument {
      title: string;
      items?: (Link | LinkList)[];
    }

    // pages
    type PageBase = SanityDocument<{
      title?: string;
      slug: { current: string };
      meta_title: string;
      meta_description: string;
      ogImage?: Image;
      noindex: boolean;
    }>;

    type Page = PageBase & {
      readonly _type: 'page';
      blocks?: Block[];
    };

    type Post = PageBase &
      SanityDocument<{
        readonly _type: 'post';
        excerpt?: string;
        author?: Author;
        categories?: Category[];
        body: any;
        image?: Image;
      }>;

    type Author = SanityDocument<{
      name: string;
      slug: { current: string };
      image?: Image;
    }>;

    type Category = SanityDocument<{
      title: string;
    }>;

    type Image = SanityImageObject &
      Partial<{
        alt: string;
        asset: {
          _id: string;
          mimeType?: string;
          metadata: {
            dimensions: SanityImageDimensions;
            lqip: string;
          };
        };
      }>;

    // objects
    type Block<T = string> = {
      _type: T;
      _key: string;
      uid?: string;
    };

    type Img = {
      readonly _type: 'img';
      image: Image;
      responsive?: {
        image: Image;
        media: string;
      }[];
      alt?: string;
      loading?: 'lazy' | 'eager';
    };

    type Image = SanityAssetDocument & {
      alt: string;
      loading: 'lazy' | 'eager';
    };

    type Link = {
      readonly _type: 'link';
      _key: string;
      label: string;
      type: 'internal' | 'external';
      internal?: {
        _type: 'page' | 'post';
        slug: string;
        title: string;
      };
      external?: string;
      params?: string;
      newTab?: boolean;
      buttonVariant?: ButtonVariant;
    };

    type LinkList = {
      readonly _type: 'link.list';
      link?: Link;
      links?: Link[];
    };
    type Announcement = SanityDocument<{
      content: any;
      cta?: Link;
      start?: string;
      end?: string;
    }>;

    type Logo = SanityDocument<{
      name: string;
      image?: Partial<{
        default: Image;
        light: Image;
        dark: Image;
      }>;
    }>;

    interface CTA {
      readonly _type?: 'cta';
      _key?: string;
      link?: Link;
      style?: string;
    }

    type StepList = Block<'steps'> & {
      title: string;
      subtitle?: string;
      steps: {
        title: string;
        description: string;
      }[];
    };
  }
}

export {};
