import * as motion from 'motion/react-client';
import { stegaClean } from 'next-sanity';

import SectionContainer, {
  ISectionContainer,
  ISectionPadding,
} from '@/components/ui/section-container';
import { cn } from '@/lib/utils';

type Step = {
  title: string;
  description: string;
};

type StepList = {
  _type: 'steps';
  _key: string;
  title: string;
  subtitle: string;
  padding: ISectionPadding;
  colorVariant: ISectionContainer['color'];
  sectionWidth: 'default' | 'narrow';
  stackAlign: 'left' | 'center';
  steps: Step[];
};

export default function Steps(props: StepList) {
  const {
    title,
    subtitle,
    steps,
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
          align === 'center' ? 'max-w-[48rem] text-center mx-auto' : undefined,
          isNarrow ? 'max-w-[48rem] mx-auto' : undefined
        )}
      >
        <div
          className={cn(color === 'primary' ? 'text-background' : undefined)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          </motion.div>
          <div className="grid gap-12 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center space-y-4"
              >
                <div className="mx-auto rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
