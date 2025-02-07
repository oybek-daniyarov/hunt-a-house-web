'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { PropertySearchForm } from './components/property-search-form';
import { PropertySearchResults } from './components/property-search-results';
import { SearchProvider, useSearch } from './components/search-provider';

function ChatContainer() {
  const { messages } = useSearch();
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <main
      className="flex-auto min-h-0 flex flex-col bg-muted/30"
      ref={containerRef}
    >
      <AnimatePresence mode="wait">
        {messages?.length ? (
          <motion.div
            key="with-messages"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-auto min-h-0 flex flex-col"
          >
            <div className="flex-none">
              <div className="sticky top-0 z-50">
                <div className="absolute inset-x-0 bottom-0 h-px bg-border/50" />
                <div className="absolute inset-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/40" />
                <div className="relative max-w-5xl mx-auto w-full px-6">
                  <div className="py-4 pb-5">
                    <PropertySearchForm />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-auto min-h-0 overflow-auto">
              <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-muted/10 pointer-events-none" />
              <div className="relative py-6">
                <div className="relative max-w-5xl mx-auto w-full px-6 pb-16">
                  <PropertySearchResults />
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="no-messages"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex-auto flex items-center justify-center py-20"
          >
            <div className="relative w-full max-w-4xl px-6">
              <div className="absolute -inset-4 bg-gradient-to-b from-muted/10 via-transparent to-muted/10 rounded-xl pointer-events-none" />
              <div className="relative space-y-12">
                <div className="text-center space-y-4">
                  <h1 className="text-4xl font-medium tracking-tight">
                    Property Research Assistant
                  </h1>
                  <p className="text-muted-foreground/80 max-w-2xl mx-auto">
                    Enter your property requirements and I&apos;ll help you find
                    the perfect match. Try something like &ldquo;2 bedroom
                    apartment in Dubai Marina for a short stay&rdquo;
                  </p>
                </div>
                <PropertySearchForm />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function Test2Page() {
  return (
    <SearchProvider>
      <ChatContainer />
    </SearchProvider>
  );
}
