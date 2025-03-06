'use client';

import { ChevronDown } from 'lucide-react';
import * as motion from 'motion/react-client';
import { stegaClean } from 'next-sanity';

import PortableTextRenderer from '@/components/portable-text-renderer';
import { Button } from '@/components/ui/button';
import { SanityImage } from '@/components/ui/sanity-image';
import SanityLink from '@/components/ui/sanity-link';
import { cn } from '@/lib/utils';

export default function Hero1({
  tagLine,
  title,
  body,
  image,
  links,
  height = 'half',
}: Partial<{
  tagLine: string;
  title: string;
  body: any;
  image: Sanity.Image;
  links?: Sanity.Link[];
  height: 'full' | 'half';
}>) {
  const isFullScreen = stegaClean(height) === 'full';

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 64, // Subtract header height
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={cn(
        'relative w-full dark:bg-background',
        isFullScreen ? 'min-h-[calc(100vh-4rem)]' : 'py-20 lg:pt-40'
      )}
    >
      <div className="container min-h-[calc(100vh-4rem)]">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex flex-col justify-center">
            {tagLine && (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="leading-[0] font-sans"
              >
                <span className="text-base font-semibold">{tagLine}</span>
              </motion.h1>
            )}
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-6 font-bold leading-[1.1]"
              >
                {title}
              </motion.h2>
            )}
            {body && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg mt-6"
              >
                <PortableTextRenderer value={body} />
              </motion.div>
            )}
            {links && links.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                {links.map((link) => (
                  <Button
                    key={link.label}
                    variant={stegaClean(link?.buttonVariant)}
                    asChild
                  >
                    <SanityLink link={link} />
                  </Button>
                ))}
              </motion.div>
            )}
          </div>
          <div className="flex flex-col justify-center">
            {image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <SanityImage className="rounded-xl" image={image} />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator for Full Screen */}
      {isFullScreen && (
        <div className="absolute bottom-8 inset-x-0">
          <motion.button
            onClick={scrollToContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1,
              repeat: Infinity,
              repeatType: 'reverse',
              repeatDelay: 0.5,
            }}
            className="mx-auto flex flex-col items-center gap-2 cursor-pointer"
          >
            <span className="text-sm text-muted-foreground">
              Scroll to explore
            </span>
            <ChevronDown className="h-6 w-6 text-muted-foreground animate-bounce" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
