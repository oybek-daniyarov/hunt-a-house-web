"use client";

import { PropertyDescriptionGenerator } from "@/components/forms/property-description-generator";
import type { z } from "zod";
import type { propertySchema } from "@/app/api/generate-property/schema";
import { Sparkles } from "lucide-react";

type PropertyData = z.infer<typeof propertySchema>;

export default function PropertyGeneratorPage() {
  const handleGenerate = (data: PropertyData) => {
    console.log("Generated property data:", data);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="min-h-[40vh] flex flex-col justify-center items-center">
          <div className="relative max-w-2xl text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI-Powered Property Requirements Generator</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight">
              Find Your Perfect Property Match
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-light">
              Simply describe your dream property in natural language, and our AI will structure your requirements 
              and match you with the perfect agents in Dubai
            </p>
          </div>

          <div className="w-full">
            <PropertyDescriptionGenerator onGenerate={handleGenerate} />
          </div>
        </div>
      </div>
    </div>
  );
} 