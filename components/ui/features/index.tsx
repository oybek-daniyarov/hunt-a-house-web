import dynamic from 'next/dynamic';
import * as motion from 'motion/react-client';
import { stegaClean } from 'next-sanity';

import SectionContainer, {
  ISectionContainer,
  ISectionPadding,
} from '@/components/ui/section-container';
import { cn } from '@/lib/utils';

// Dynamically import Lucide icons
const Icons = {
  Users: dynamic(() => import('lucide-react').then((mod) => mod.Users)),
  Layers: dynamic(() => import('lucide-react').then((mod) => mod.Layers)),
  LineChart: dynamic(() => import('lucide-react').then((mod) => mod.LineChart)),
  Star: dynamic(() => import('lucide-react').then((mod) => mod.Star)), // For Top-Rated Agents
  UserCheck: dynamic(() => import('lucide-react').then((mod) => mod.UserCheck)), // For Personalized Matches
  Sparkles: dynamic(() => import('lucide-react').then((mod) => mod.Sparkles)), // For Seamless Experience
  BarChart2: dynamic(() => import('lucide-react').then((mod) => mod.BarChart2)), // For Market Insights
  // Additional icons that might be useful
  Medal: dynamic(() => import('lucide-react').then((mod) => mod.Medal)),
  Target: dynamic(() => import('lucide-react').then((mod) => mod.Target)),
  Zap: dynamic(() => import('lucide-react').then((mod) => mod.Zap)),
  TrendingUp: dynamic(() =>
    import('lucide-react').then((mod) => mod.TrendingUp)
  ),
};

type Feature = {
  title: string;
  subtitle: string;
  description: string;
  icon: keyof typeof Icons;
};

type FeaturesProps = {
  _type: 'features';
  _key: string;
  title: string;
  subtitle?: string;
  padding: ISectionPadding;
  colorVariant: ISectionContainer['color'];
  sectionWidth: 'default' | 'narrow';
  stackAlign: 'left' | 'center';
  features: Feature[];
};

export default function Features(props: FeaturesProps) {
  const {
    title,
    subtitle,
    features,
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
  } = props;

  const isNarrow = stegaClean(sectionWidth) === 'narrow';
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      <div
        className={cn(
          align === 'center' ? 'text-center' : undefined,
          isNarrow ? 'max-w-[48rem]' : 'max-w-7xl',
          'mx-auto'
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          )}
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = Icons[feature.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  'flex flex-col gap-4',
                  'py-6 px-4 rounded-lg text-left',
                  'bg-card text-card-foreground',
                  'shadow-sm dark:shadow-primary/5',
                  'border dark:border-primary/10'
                )}
              >
                <div className="flex gap-4 text-left">
                  <div>
                    <div className="rounded-lg bg-muted p-3">
                      {Icon && <Icon className="h-6 w-6 text-primary" />}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
