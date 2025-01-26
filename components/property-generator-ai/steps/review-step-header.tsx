'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Pen } from 'lucide-react';

import { usePropertyForm } from '@/components/property-generator-ai/providers/property-form-provider';
import { usePropertyGenerator } from '@/components/property-generator-ai/providers/property-generator-provider';
import { Badge } from '@/components/ui/badge';

const LOADING_STEPS = [
  'Analyzing your requirements...',
  'Structuring property details...',
  'Finalizing property description...',
];
export const ReviewStepHeader = () => {
  const { isLoading } = usePropertyGenerator();
  const { isEditing } = usePropertyForm();

  const [currentLoadingStep, setCurrentLoadingStep] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setCurrentLoadingStep(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentLoadingStep((prev) => {
        if (prev < LOADING_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div className="text-sm text-muted-foreground pb-4 border-b">
      {isLoading ? (
        <motion.div
          className="flex items-center justify-center gap-2 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          <motion.span
            key={currentLoadingStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {LOADING_STEPS[currentLoadingStep]}
          </motion.span>
        </motion.div>
      ) : isEditing ? (
        <div className="flex items-center gap-1.5">
          Please{' '}
          <Badge variant="outline" className="font-normal">
            save
          </Badge>{' '}
          or{' '}
          <Badge variant="outline" className="font-normal">
            cancel
          </Badge>{' '}
          your changes before proceeding.
        </div>
      ) : (
        <>
          Click the edit icons{' '}
          <Pen className="inline-block h-4 w-4 mx-1 opacity-50" /> to modify any
          section of your requirements. Your changes will be used to refine the
          property search.
        </>
      )}
    </div>
  );
};
