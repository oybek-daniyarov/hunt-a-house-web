"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePropertyGeneratorContext } from "./property-generator-provider";

export function StepIndicator() {
  const { currentStep, isLoading } = usePropertyGeneratorContext();

  const showResults = currentStep === 'review' || currentStep === 'preview';
  const hasPartialData = currentStep === 'loading';
  const isPreviewStep = currentStep === 'preview';

  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mx-auto">
        <div className="flex flex-col items-center gap-2">
          <div className={cn(
            "w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium shadow-sm",
            !showResults 
              ? "border-primary bg-primary text-background" 
              : "border-primary/30 bg-primary/10 text-primary"
          )}>
            {!showResults ? "1" : <Check className="h-5 w-5" />}
          </div>
          <div className="text-sm font-medium">Describe</div>
          <div className="text-xs text-muted-foreground">Natural language input</div>
        </div>
        
        <div className="w-32 h-[2px] bg-border/30 relative top-[-12px]">
          <div className={cn(
            "h-full bg-primary transition-all duration-500",
            hasPartialData ? "w-1/2" : showResults ? "w-full" : "w-0"
          )} />
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className={cn(
            "w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium shadow-sm",
            hasPartialData && !isPreviewStep
              ? "border-primary bg-primary text-background"
              : showResults && !isPreviewStep
                ? "border-primary/50 bg-primary/10 text-primary animate-pulse"
                : "border-border/50 bg-muted/50 text-muted-foreground"
          )}>
            2
          </div>
          <div className="text-sm font-medium">Review & Edit</div>
          <div className="text-xs text-muted-foreground">Verify details</div>
        </div>

        <div className="w-32 h-[2px] bg-border/30 relative top-[-12px]">
          <div className={cn(
            "h-full bg-primary transition-all duration-500",
            isPreviewStep ? "w-full" : "w-0"
          )} />
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className={cn(
            "w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium shadow-sm",
            isPreviewStep
              ? "border-primary bg-primary text-background"
              : "border-border/50 bg-muted/50 text-muted-foreground"
          )}>
            3
          </div>
          <div className="text-sm font-medium">Preview & Submit</div>
          <div className="text-xs text-muted-foreground">Final review</div>
        </div>
      </div>
    </motion.div>
  );
} 