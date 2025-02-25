import { PortableText } from '@portabletext/react';
import * as motion from 'motion/react-client';
import { stegaClean } from 'next-sanity';

import AgentForm from '@/components/forms/agent-form';
import LeadForm from '@/components/forms/lead';
import { Button } from '@/components/ui/button';
import SanityLink from '@/components/ui/sanity-link';
import SectionContainer, {
  ISectionContainer,
  ISectionPadding,
} from '@/components/ui/section-container';
import { cn } from '@/lib/utils';

type SplitFormProps = {
  _type: 'split-form';
  _key: string;
  formType: 'agent' | 'client';
  tagLine?: string;
  title: string;
  body?: any[];
  link?: {
    _type: 'link';
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
    buttonVariant?:
      | 'link'
      | 'secondary'
      | 'destructive'
      | 'default'
      | 'outline'
      | 'destructive-outline'
      | 'ghost';
  };
  padding: ISectionPadding;
  colorVariant: ISectionContainer['color'];
  sectionWidth: 'default' | 'narrow';
  stackAlign: 'left' | 'center';
};

export default function SplitForm(props: SplitFormProps) {
  const {
    formType,
    tagLine,
    title,
    body,
    link,
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
          'grid gap-8 lg:grid-cols-2 items-center',
          isNarrow ? 'max-w-[48rem] mx-auto' : 'max-w-7xl mx-auto'
        )}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={cn(
            'flex flex-col justify-center',
            align === 'center' ? 'text-center' : 'text-start'
          )}
        >
          {tagLine && (
            <p className="text-sm font-semibold leading-7 text-primary">
              {tagLine}
            </p>
          )}
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {title}
          </h2>
          {body && (
            <div className="prose dark:prose-invert mb-8">
              <PortableText value={body} />
            </div>
          )}
          {link && link?.label && (
            <Button
              variant={stegaClean(link.buttonVariant) || 'default'}
              asChild
            >
              <SanityLink link={link} />
            </Button>
          )}
        </motion.div>

        {/* Form Side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card text-card-foreground shadow-sm dark:shadow-primary/5 border dark:border-primary/10 rounded-lg p-4"
        >
          {formType === 'agent' ? <AgentForm /> : <LeadForm />}
        </motion.div>
      </div>
    </SectionContainer>
  );
}
