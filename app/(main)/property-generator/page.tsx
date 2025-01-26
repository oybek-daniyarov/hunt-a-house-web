"use client";

import { Sparkles } from "lucide-react";
import { z } from "zod";
import { propertySchema } from "@/app/api/generate-property/schema";
import { PropertyDescriptionGenerator } from "@/components/forms/property-description-generator";

type PropertyResponse = z.infer<typeof propertySchema>;

export default function PropertyGeneratorPage() {

    const handleGenerate = (data: PropertyResponse) => {
        console.log("Generated work request:", data);
      };
  return (
    <div className="transition-colors duration-300 dark:bg-zinc-950">
      <div className="container mx-auto md:py-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex flex-col items-center">
          <div className="relative max-w-4xl text-center space-y-6 mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-accent/40 dark:bg-accent/20 px-4 py-1.5 rounded-full mb-6 hover:bg-accent/60 dark:hover:bg-accent/30 transition-colors duration-200">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium">AI-Powered Property Matching</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              Connect with the Perfect Dubai Agent
            </h1>
            <p className="text-base md:text-lg text-muted-foreground/80 font-light mx-auto">
              Simply describe your dream property in natural language, and our AI will structure your requirements 
              and match you with the perfect agents in Dubai
            </p>
          </div>
        </div>
        <PropertyDescriptionGenerator handleGenerate={handleGenerate} />

      </div>
    </div>
  );
} 