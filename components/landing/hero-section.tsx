import Link from 'next/link';
import * as motion from 'motion/react-client';

import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  title: string;
  description: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
}

export function HeroSection({
  title,
  description,
  primaryCta,
  secondaryCta,
}: HeroSectionProps) {
  return (
    <section className="relative h-[calc(100vh-4rem)] w-full">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="h-full w-full bg-gradient-to-b from-muted/80 to-muted/40 dark:from-muted/20 dark:to-muted/10">
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
        </div>
      </div>

      <div className="relative h-full w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-full flex-col items-center justify-center">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center max-w-4xl mx-auto space-y-8"
          >
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                {title}
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
                {description}
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                variant="default"
                className="min-w-[160px] bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90"
                asChild
              >
                <Link href={primaryCta.href}>{primaryCta.text}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="min-w-[160px] border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-black/80"
                asChild
              >
                <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1,
              repeat: Infinity,
              repeatType: 'reverse',
              repeatDelay: 0.5,
            }}
            className="absolute bottom-12 inset-x-0 mx-auto w-fit"
          >
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-muted-foreground">Scroll to explore</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground animate-bounce"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
