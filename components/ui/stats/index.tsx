import * as motion from 'motion/react-client';
import { stegaClean } from 'next-sanity';

import { NumberTicker } from '@/components/ui/number-ticker';
import SectionContainer, {
  ISectionContainer,
  ISectionPadding,
} from '@/components/ui/section-container';
import { cn } from '@/lib/utils';

type Stat = {
  prefix?: string;
  value: string;
  suffix?: string;
  label: string;
};

type StatsProps = {
  _type: 'stats';
  _key: string;
  padding: ISectionPadding;
  colorVariant: ISectionContainer['color'];
  sectionWidth: 'default' | 'narrow';
  stackAlign: 'left' | 'center';
  stats: Stat[];
};

export default function Stats(props: StatsProps) {
  const { stats, padding, colorVariant, sectionWidth, stackAlign } = props;

  const isNarrow = stegaClean(sectionWidth) === 'narrow';
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      <div
        className={cn(
          align === 'center' ? 'max-w-[48rem] text-center mx-auto' : undefined,
          isNarrow ? 'max-w-[48rem] mx-auto' : undefined
        )}
      >
        <div
          className={cn(
            'grid gap-8 sm:grid-cols-2 lg:grid-cols-4',
            color === 'primary' ? 'text-background' : undefined
          )}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold tracking-tight sm:text-5xl flex items-end justify-center gap-1">
                <span className="text-muted-foreground text-xl">
                  {stat.prefix}
                </span>
                <NumberTicker value={Number(stat.value)} />
                <span>{stat.suffix}</span>
              </div>
              <p className="mt-2 text-base text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
