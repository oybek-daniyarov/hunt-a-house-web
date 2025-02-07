import * as React from 'react';
import { Message } from 'ai';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Clock, Code2, Home, Key, Search } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useSearch } from './search-provider';

const WORKFLOW_STEPS = [
  {
    id: 'extract-keywords',
    label: 'Extracting Keywords',
    icon: Key,
    description: 'Analyzing search query for key requirements',
    details: {
      input: 'Natural language query',
      output: 'Structured search parameters',
      process: 'AI-powered keyword extraction and intent analysis',
    },
  },
  {
    id: 'research-property',
    label: 'Researching Property',
    icon: Search,
    description: 'Gathering property information',
    details: {
      input: 'Search parameters',
      output: 'Detailed property insights',
      process: 'Market analysis and property research',
    },
  },
  {
    id: 'generate-listing',
    label: 'Generating Listing',
    icon: Home,
    description: 'Creating property listing',
    details: {
      input: 'Property research data',
      output: 'Optimized property listing',
      process: 'AI-powered listing generation',
    },
  },
] as const;

function formatTime(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function MarkdownViewer({ markdown }: { markdown: string }) {
  return <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>;
}

function JsonValue({ value, level = 0 }: { value: any; level?: number }) {
  const [isOpen, setIsOpen] = React.useState(level < 2);

  if (typeof value === 'string') {
    return (
      <span className="text-green-500 dark:text-green-400">
        &quot;{value}&quot;
      </span>
    );
  }
  if (typeof value === 'number') {
    return <span className="text-blue-500 dark:text-blue-400">{value}</span>;
  }
  if (typeof value === 'boolean') {
    return (
      <span className="text-yellow-500 dark:text-yellow-400">
        {value.toString()}
      </span>
    );
  }
  if (value === null) {
    return <span className="text-gray-500 dark:text-gray-400">null</span>;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return <span>[]</span>;
    return (
      <div>
        <div
          className="inline-flex items-center gap-1 cursor-pointer hover:text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDown
            className={cn(
              'h-3 w-3 transition-transform',
              !isOpen && '-rotate-90'
            )}
          />
          <span>Array[{value.length}]</span>
        </div>
        {isOpen && (
          <div className="pl-4 border-l border-border">
            {value.map((item, i) => (
              <div key={i} className="py-0.5">
                <span className="text-muted-foreground">{i}:</span>{' '}
                <JsonValue value={item} level={level + 1} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value);
    if (entries.length === 0) return <span>{'{}'}</span>;
    return (
      <div>
        <div
          className="inline-flex items-center gap-1 cursor-pointer hover:text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDown
            className={cn(
              'h-3 w-3 transition-transform',
              !isOpen && '-rotate-90'
            )}
          />
          <span>Object</span>
        </div>
        {isOpen && (
          <div className="pl-4 border-l border-border">
            {entries.map(([key, val]) => (
              <div key={key} className="py-0.5">
                <span className="text-muted-foreground">{key}:</span>{' '}
                <JsonValue value={val} level={level + 1} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  return <span>{String(value)}</span>;
}

function DataViewer({ data }: { data: any }) {
  return (
    <div className="p-4 bg-muted/50 font-mono text-xs">
      <JsonValue value={data} level={0} />
    </div>
  );
}

function toSentenceCase(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function SearchResponse({ data }: { data: any }) {
  if (!data) return null;

  // Important keyword fields to display
  const importantKeywords = [
    'searchQuery',
    'intent',
    'emirate',
    'location',
    'propertyType',
    'duration',
    'budget',
    'bedroomSize',
    'amount',
  ];

  // Format amount if available
  const formatAmount = (value: any) => {
    if (typeof value === 'object' && value.min && value.max) {
      return `${value.min.toLocaleString()}-${value.max.toLocaleString()} AED`;
    }
    return String(value);
  };

  return (
    <div className="px-4 py-3 border-t border-border/50 text-sm">
      <div className="grid gap-3">
        {data.keywords && Object.keys(data.keywords).length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-medium text-primary/80">Keywords</div>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(data.keywords)
                .filter(
                  ([key, value]) =>
                    importantKeywords.includes(key) &&
                    value !== null &&
                    value !== undefined &&
                    value !== '' &&
                    value !== 'null'
                )
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="text-xs bg-secondary/40 hover:bg-secondary/60 transition-colors rounded-md px-2.5 py-1 border border-border"
                  >
                    <span className="text-muted-foreground">
                      {toSentenceCase(key)}:
                    </span>{' '}
                    <span className="font-medium">
                      {key === 'amount' ? formatAmount(value) : String(value)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
        {data.text && (
          <div className="space-y-2">
            <div className="text-xs font-medium text-primary/80">Research</div>
            <div className="text-xs leading-relaxed bg-secondary/40 hover:bg-secondary/60 transition-colors rounded-md px-3 py-2 border border-border">
              <MarkdownViewer markdown={data.text} />
            </div>
          </div>
        )}
        {(data.location || data.price || data.listing) && (
          <div className="space-y-2">
            <div className="text-xs font-medium text-primary/80">
              Listing Details
            </div>
            <div className="space-y-3">
              {data.content && (
                <div className="text-xs leading-relaxed bg-secondary/40 hover:bg-secondary/60 transition-colors rounded-md px-3 py-2 border border-border">
                  {data.content}
                </div>
              )}
              <div className="flex flex-wrap gap-1.5">
                {data.listing?.size?.bedrooms && (
                  <>
                    <div className="text-xs bg-secondary/40 hover:bg-secondary/60 transition-colors rounded-md px-2.5 py-1 border border-border">
                      <span className="text-muted-foreground">Bedrooms:</span>{' '}
                      <span className="font-medium">
                        {toSentenceCase(data.listing.size.bedrooms)}
                        {data.listing.size.bathrooms && (
                          <> · {data.listing.size.bathrooms} bath</>
                        )}
                      </span>
                    </div>
                    {data.listing.size.max !== undefined &&
                      data.listing.size.min !== undefined && (
                        <div className="text-xs bg-secondary/40 hover:bg-secondary/60 transition-colors rounded-md px-2.5 py-1 border border-border">
                          <span className="text-muted-foreground">Area:</span>{' '}
                          <span className="font-medium">
                            {data.listing.size.min.toLocaleString()}-
                            {data.listing.size.max.toLocaleString()} sqft
                          </span>
                        </div>
                      )}
                  </>
                )}
                {data.price?.min !== undefined &&
                  data.price?.max !== undefined && (
                    <div className="text-xs bg-secondary/40 hover:bg-secondary/60 transition-colors rounded-md px-2.5 py-1 border border-border">
                      <span className="text-muted-foreground">Price:</span>{' '}
                      <span className="font-medium">
                        {data.price.min.toLocaleString()} -{' '}
                        {data.price.max.toLocaleString()} AED{' '}
                        {data.price.term?.toLowerCase()}
                        {data.price.range && (
                          <> · {toSentenceCase(data.price.range)}</>
                        )}
                      </span>
                    </div>
                  )}
                {data.location?.locationPath ||
                (data.location?.locationName && data.location?.emirateName) ? (
                  <div className="text-xs bg-secondary/40 hover:bg-secondary/60 transition-colors rounded-md px-2.5 py-1 border border-border">
                    <span className="text-muted-foreground">Location:</span>{' '}
                    <span className="font-medium">
                      {data.location.locationPath ||
                        `${data.location.locationName}, ${data.location.emirateName}`}
                    </span>
                  </div>
                ) : null}
                {data.listing?.type && data.listing?.activity && (
                  <div className="text-xs bg-secondary/40 hover:bg-secondary/60 transition-colors rounded-md px-2.5 py-1 border border-border">
                    <span className="text-muted-foreground">Type:</span>{' '}
                    <span className="font-medium">
                      {toSentenceCase(data.listing.type)} ·{' '}
                      {toSentenceCase(data.listing.activity)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepCard({
  step,
  annotation,
}: {
  step: (typeof WORKFLOW_STEPS)[number];
  annotation: any;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.32, 0.72, 0, 1],
      }}
      className="bg-card rounded-xl overflow-visible border shadow-sm"
    >
      <div className="p-4">
        <div className="group relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <step.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <div className="font-medium text-base">{step.label}</div>
                <div className="text-[10px] text-muted-foreground/70 truncate">
                  {step.description}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <Badge variant="secondary" className="text-xs h-6 gap-1.5 px-2">
                <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                {formatTime(annotation.processingTime)}
              </Badge>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-4 text-[10px] px-0 underline text-muted-foreground/70 hover:text-muted-foreground hover:no-underline"
                  >
                    view details
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-3" align="end">
                  <div className="grid gap-2 text-xs">
                    <div className="grid grid-cols-[100px,1fr] gap-2">
                      <span className="text-muted-foreground">Input</span>
                      <span>{step.details.input}</span>
                    </div>
                    <div className="grid grid-cols-[100px,1fr] gap-2">
                      <span className="text-muted-foreground">Process</span>
                      <span>{step.details.process}</span>
                    </div>
                    <div className="grid grid-cols-[100px,1fr] gap-2">
                      <span className="text-muted-foreground">Output</span>
                      <span>{step.details.output}</span>
                    </div>
                    {annotation.data?.usage && (
                      <div className="grid grid-cols-[100px,1fr] gap-2">
                        <span className="text-muted-foreground">Tokens</span>
                        <span>
                          {annotation.data.usage.totalTokens.toLocaleString()}{' '}
                          total (
                          {annotation.data.usage.promptTokens.toLocaleString()}{' '}
                          prompt,{' '}
                          {annotation.data.usage.completionTokens.toLocaleString()}{' '}
                          completion)
                        </span>
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      <SearchResponse data={annotation.data} />

      <div>
        <button
          className={cn(
            'w-full flex items-center justify-between p-2.5 text-xs text-muted-foreground/70 hover:text-muted-foreground hover:bg-muted/40 border-t border-border transition-colors',
            isOpen && 'bg-muted/40'
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-1.5">
            <Code2 className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span className="font-medium">View Raw Data</span>
          </div>
          <ChevronDown
            className={cn(
              'h-3.5 w-3.5 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
            strokeWidth={1.5}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-border"
            >
              <DataViewer data={annotation.data} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  const annotations = message.annotations as any[];

  return (
    <div
      className={cn(
        'flex w-full items-start gap-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'flex w-full flex-col gap-6',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        {!isUser && annotations?.length > 0 && (
          <div className="grid gap-6 w-full">
            {annotations.map((annotation) => {
              const step = WORKFLOW_STEPS.find(
                (step) => step.id === annotation.type
              );
              if (!step) return null;

              return (
                <StepCard
                  key={annotation.id}
                  step={step}
                  annotation={annotation}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export function PropertySearchResults() {
  const { messages } = useSearch();

  if (!messages?.length) {
    return null;
  }

  return (
    <div className="space-y-8 py-2">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
}
