'use client';

import { motion } from 'framer-motion';

import { usePropertyGenerator } from '@/components/property-generator-ai/providers/property-generator-provider';

export function ErrorMessage() {
  const { error } = usePropertyGenerator();

  if (!error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 p-4 rounded-lg bg-destructive/10 text-destructive text-sm"
    >
      An error occurred while generating property requirements. Please try
      again.
    </motion.div>
  );
}
