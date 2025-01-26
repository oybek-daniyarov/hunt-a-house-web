import Link from 'next/link';
import * as motion from 'motion/react-client';

import { Button } from '@/components/ui/button';
import { featureIcons, type FeatureIconType } from './feature-icons';

interface Feature {
  icon: FeatureIconType;
  text: string;
}

interface FeaturesSectionProps {
  title: string;
  description: string;
  features: Feature[];
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
  children?: React.ReactNode;
}

export function FeaturesSection({
  title,
  description,
  features,
  primaryCta,
  secondaryCta,
  children,
}: FeaturesSectionProps) {
  return (
    <div className="container">
      <div className="py-20 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                {title}
              </h1>
              <p className="text-lg text-muted-foreground">{description}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4 min-[400px]:flex-row"
            >
              <Button size="lg" asChild>
                <Link href={primaryCta.href}>{primaryCta.text}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
              </Button>
            </motion.div>
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = featureIcons[feature.icon];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-6 w-6 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      {feature.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              type: 'spring',
              stiffness: 100,
              damping: 20,
            }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="relative  w-full overflow-hidden rounded-xl bg-gradient-to-b from-muted/80 to-muted/40 dark:from-muted/20 dark:to-muted/10">
              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
