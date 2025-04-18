import Link from 'next/link';
import { YouTubeEmbed } from '@next/third-parties/google';
import { PortableText, PortableTextProps } from '@portabletext/react';

import { SanityImage } from '@/components/ui/sanity-image';

const portableTextComponents: PortableTextProps['components'] = {
  types: {
    image: ({ value }) => {
      return <SanityImage image={value} />;
    },

    youtube: ({ value }) => {
      const { videoId } = value;
      return (
        <div className="max-w-3xl w-full mx-auto">
          <div className="aspect-video">
            <YouTubeEmbed videoid={videoId} params="rel=0" />
          </div>
        </div>
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <p style={{ marginBottom: '1rem' }}>{children}</p>
    ),
    h1: ({ children }) => (
      <h1 style={{ marginBottom: '1rem', marginTop: '1rem' }}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ marginBottom: '1rem', marginTop: '1rem' }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ marginBottom: '1rem', marginTop: '1rem' }}>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 style={{ marginBottom: '1rem', marginTop: '1rem' }}>{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 style={{ marginBottom: '1rem', marginTop: '1rem' }}>{children}</h5>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const isExternal =
        (value?.href || '').startsWith('http') ||
        (value?.href || '').startsWith('https') ||
        (value?.href || '').startsWith('mailto');
      const target = isExternal ? '_blank' : undefined;
      return (
        <Link
          href={value?.href}
          target={target}
          rel={target ? 'noopener' : undefined}
          style={{ textDecoration: 'underline' }}
        >
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul
        style={{
          paddingLeft: '1.5rem',
          marginBottom: '1rem',
          listStyleType: 'disc',
          listStylePosition: 'inside',
        }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        style={{
          paddingLeft: '1.5rem',
          marginBottom: '1rem',
          listStyleType: 'decimal',
          listStylePosition: 'inside',
        }}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li style={{ marginBottom: '0.5rem' }}>{children}</li>
    ),
    number: ({ children }) => (
      <li style={{ marginBottom: '0.5rem' }}>{children}</li>
    ),
  },
};

const PortableTextRenderer = ({
  value,
}: {
  value: PortableTextProps['value'];
}) => {
  return <PortableText value={value} components={portableTextComponents} />;
};

export default PortableTextRenderer;
