'use client';

import { ChevronDown } from 'lucide-react';
import * as motion from 'motion/react-client';
import { stegaClean } from 'next-sanity';

import PortableTextRenderer from '@/components/portable-text-renderer';
import { Button } from '@/components/ui/button';
import SanityLink from '@/components/ui/sanity-link';
import { cn } from '@/lib/utils';

export default function Hero2({
  tagLine,
  title,
  body,
  links,
  height = 'half',
}: Partial<{
  tagLine: string;
  title: string;
  body: any;
  links: Sanity.Link[];
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
      <div className="container h-full flex flex-col justify-center">
        <div className="text-center">
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
              className="mt-6 font-bold leading-[1.1] text-4xl md:text-5xl lg:text-6xl"
            >
              {title}
            </motion.h2>
          )}
          {body && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg mt-6 max-w-2xl mx-auto"
            >
              <PortableTextRenderer value={body} />
            </motion.div>
          )}
          {links && links.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4 justify-center"
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
