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
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center">
          <div className="relative max-w-2xl text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI-Powered Property Matching</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight">
              Connect with the Perfect Dubai Agent
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-light">
              Simply describe your dream property in natural language, and our AI will structure your requirements 
              and match you with the perfect agents in Dubai
            </p>
          </div>

          <div className="w-full">
            <PropertyDescriptionGenerator handleGenerate={handleGenerate} />
          </div>
        </div>
      </div>
    </div>
  );
} 