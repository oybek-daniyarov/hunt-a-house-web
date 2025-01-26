"use client";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { StepIndicator } from "./step-indicator";
import { StepRenderer } from "./components/step-renderer";
import { PropertyGeneratorProvider, usePropertyGeneratorContext } from "./property-generator-provider";
import type { PropertyResponse } from "@/app/api/generate-property/schema";

interface PropertyDescriptionGeneratorProps {
  handleGenerate: (data: PropertyResponse) => void;
}

export function PropertyDescriptionGenerator({ handleGenerate }: PropertyDescriptionGeneratorProps) {
  return (
    <PropertyGeneratorProvider handleGenerate={handleGenerate}>
      <div className="relative w-full">
        <StepIndicator />
        
        <div className="relative">
          <AnimatePresence mode="wait">
            <StepRenderer />
          </AnimatePresence>
        </div>

        <ErrorMessage />
      </div>
    </PropertyGeneratorProvider>
  );
}

function ErrorMessage() {
  const { error } = usePropertyGeneratorContext();

  if (!error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 p-4 rounded-lg bg-destructive/10 text-destructive text-sm"
    >
      An error occurred while generating property requirements. Please try again.
    </motion.div>
  );
} 