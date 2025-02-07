'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const LOADING_STEPS = [
  'Analyzing your property preferences...',
  'Exploring available locations...',
  'Gathering neighborhood details...',
  'Checking local amenities...',
  'Analyzing transport connections...',
  'Compiling property features...',
  'Finalizing your personalized results...',
];

export function LoadingState() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) =>
        prev < LOADING_STEPS.length - 1 ? prev + 1 : prev
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center p-8 space-y-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="relative h-12 w-12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.2,
          }}
          className="absolute top-0 right-0"
        >
          <Sparkles className="h-6 w-6 text-primary" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.2,
            delay: 0.5,
          }}
          className="absolute bottom-0 left-0"
        >
          <Sparkles className="h-6 w-6 text-primary" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.2,
            delay: 1,
          }}
          className="absolute top-0 left-0"
        >
          <Sparkles className="h-4 w-4 text-primary/60" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.2,
            delay: 1.5,
          }}
          className="absolute bottom-0 right-0"
        >
          <Sparkles className="h-4 w-4 text-primary/60" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center gap-2 text-center"
      >
        <div className="h-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-base font-medium text-primary"
            >
              {LOADING_STEPS[currentStep]}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="text-sm text-muted-foreground">
          Please wait while we prepare everything
        </div>
      </motion.div>
    </motion.div>
  );
}
