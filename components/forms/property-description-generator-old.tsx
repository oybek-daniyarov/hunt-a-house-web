"use client";

import { useEffect, useState } from "react";
import { experimental_useObject as useObject } from "ai/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { propertySchema } from "../../app/api/generate-property/schema";
import type { z } from "zod";
import {
  Loader2, 
  AlertCircle,
  Code2,
  Building2,
  Calendar,
  Clock,
  Coins,
  FileText,
  Users,
  Laptop,
  CheckCircle2,
  ListChecks,
  Link,
  Check,
  Sparkles,
  ShoppingCart,
  Globe,
  Store,
  Home,
  Building,
  MapPin
} from "lucide-react";

type PropertyResponse = z.infer<typeof propertySchema>;

interface PropertyDescriptionGeneratorProps {
  handleGenerate: (data: PropertyResponse) => void;
}

const propertyTypes = {
  1: 'Apartment',
  2: 'Villa',
  3: 'Townhouse'
} as const;

const activityTypes = {
  1: 'Buy',
  2: 'Rent Long Term',
  3: 'Rent Short Term'
} as const;

const examples = [
  {
    icon: Building,
    title: "Luxury Apartment",
    tags: ["Dubai Marina", "Rent", "2BR"],
    text: "Looking for a 2-bedroom luxury apartment in Dubai Marina for rent. Budget around 150k per year. Must have a balcony with marina view and parking."
  },
  {
    icon: Home,
    title: "Family Villa",
    tags: ["Arabian Ranches", "Buy", "4BR"],
    text: "Want to buy a 4-bedroom villa in Arabian Ranches. Budget up to 5M AED. Need a maid's room and private garden. Type 2 or larger preferred."
  },
  {
    icon: Building2,
    title: "Studio Apartment",
    tags: ["Business Bay", "Rent", "Studio"],
    text: "Need a furnished studio apartment in Business Bay for short-term rental. Monthly budget 8k-12k. Must be close to metro and have gym access."
  },
  {
    icon: MapPin,
    title: "Investment Property",
    tags: ["JVC", "Buy", "ROI"],
    text: "Looking to buy a 1-bedroom apartment in JVC for investment. Budget around 800k. Good rental yield is important. Prefer newer buildings with good facilities."
  }
];

export function PropertyDescriptionGenerator2({ handleGenerate }: PropertyDescriptionGeneratorProps) {
  const [description, setDescription] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isPreviewStep, setIsPreviewStep] = useState(false);

  const { object: partialData, submit, isLoading, error } = useObject<PropertyResponse>({
    api: "/api/generate-property",
    schema: propertySchema,
  });

  const propertyData = partialData as PropertyResponse | null;
  const hasPartialData = propertyData && Object.keys(propertyData).length > 0;

  useEffect(() => {
    if (propertyData && Object.keys(propertyData).length > 0) {
      handleGenerate(propertyData);
    }
  }, [propertyData, handleGenerate]);

  const handleSubmitClick = () => {
    setIsPreviewStep(true);
  };

  const handleBackClick = () => {
    setIsPreviewStep(false);
  };

  const handleSubmit = async () => {
    if (isLoading || !description.trim()) return;
    
    setShowResults(true);
    try {
      await submit({ description });
    } catch (error) {
      console.error("Error generating property requirements:", error);
      setShowResults(false);
    }
  };

  const handleNewDescription = () => {
    setShowResults(false);
    setDescription("");
  };

  function formatBudget(min: number | null, max: number | null, frequency: string | null) {
    if (!min && !max) return 'Not specified';
    
    const formatNumber = (num: number) => 
      new Intl.NumberFormat('en-AE', { 
        style: 'currency', 
        currency: 'AED',
        maximumFractionDigits: 0 
      }).format(num);

    const range = [min && formatNumber(min), max && formatNumber(max)]
      .filter(Boolean)
      .join(' - ');

    const period = frequency === 'one_time' ? '' 
      : frequency === 'yearly' ? ' per year'
      : frequency === 'monthly' ? ' per month'
      : frequency === 'daily' ? ' per day'
      : '';

    return `${range}${period}`;
  }

  function formatSize(min: number | null, max: number | null) {
    if (!min && !max) return 'Not specified';
    
    const formatNumber = (num: number) => `${num.toLocaleString()} sqft`;
    
    return [min && formatNumber(min), max && formatNumber(max)]
      .filter(Boolean)
      .join(' - ');
  }

  const renderSteps = () => (
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
            hasPartialData ? "w-full" : showResults ? "w-1/2" : "w-0"
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

  return (
    <div className="relative">
      {renderSteps()}
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="relative mx-auto">
              <div className="group relative">
                <Textarea
                  placeholder="Describe your dream property... (e.g., 'Looking for a 2-bedroom luxury apartment in Dubai Marina with marina view, budget around 150k per year for a long-term rental')"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px] resize-y bg-background text-base p-6 pr-[120px] border border-border/50 focus:border-primary/20 transition-colors rounded-xl shadow-sm"
                />
                <div className="absolute inset-0 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                  <div className="absolute inset-0 border-2 border-primary/20 rounded-xl" />
                </div>
              </div>
              <Button 
                onClick={handleSubmit} 
                size="lg"
                className={cn(
                  "absolute bottom-4 right-4 shadow-sm",
                  isLoading && "bg-primary/80"
                )}
                disabled={isLoading || !description.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="text-sm font-medium mb-4">Try these examples:</div>
              <div className="grid sm:grid-cols-2 gap-4">
                {examples.map((example, i) => {
                  const Icon = example.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => {
                        setDescription(example.text);
                        setTimeout(() => handleSubmit(), 100);
                      }}
                      className="group relative bg-card hover:bg-accent transition-colors p-4 rounded-xl border border-border/50 cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="space-y-2">
                          <div className="font-medium text-sm">{example.title}</div>
                          <div className="flex flex-wrap gap-1.5">
                            {example.tags.map((tag, j) => (
                              <Badge 
                                key={j}
                                variant="secondary" 
                                className="text-xs bg-secondary/50"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {example.text}
                          </p>
                        </div>
                      </div>
                      <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : hasPartialData ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <h2 className="text-xl font-medium">
                {isPreviewStep ? "Preview Requirements" : "Review Property Requirements"}
              </h2>
              <div className="flex items-center gap-2">
                {isPreviewStep ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBackClick}
                    className="text-xs"
                  >
                    Back to Review
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNewDescription}
                    className="text-xs"
                  >
                    Start Over
                  </Button>
                )}
                {!isPreviewStep && (
                  <Button
                    size="sm"
                    className="text-xs"
                    onClick={handleSubmitClick}
                  >
                    Continue to Preview
                  </Button>
                )}
                {isPreviewStep && (
                  <Button
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      // Handle final submission
                      console.log("Final submission:", propertyData);
                    }}
                  >
                    Submit Requirements
                  </Button>
                )}
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-background border border-border/50 p-8 rounded-xl shadow-sm max-w-4xl mx-auto"
            >
              <div className="space-y-6">
                <div className="text-sm text-muted-foreground pb-4 border-b">
                  Click the edit icons <FileText className="inline-block h-4 w-4 mx-1 opacity-50" /> to modify any section of your requirements. Your changes will be used to refine the property search.
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative">
                    <div className="absolute right-0 top-0 flex items-center">
                      <Button variant="ghost" size="sm" className="h-8 px-2 opacity-70 hover:opacity-100">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">Edit Location</span>
                      </Button>
                    </div>
                    <h3 className="font-semibold mb-2">Location</h3>
                    <p className="text-sm text-muted-foreground mb-1">Emirate: {propertyData?.emirate_name || 'Not specified'}</p>
                    {propertyData?.areas?.length > 0 && (
                      <p className="text-sm text-muted-foreground mb-1">
                        Areas: {propertyData?.areas?.join(', ')}
                      </p>
                    )}
                    {propertyData?.communities && Array.isArray(propertyData.communities) && propertyData.communities.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        Communities: {propertyData.communities.join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute right-0 top-0 flex items-center">
                      <Button variant="ghost" size="sm" className="h-8 px-2 opacity-70 hover:opacity-100">
                        <Building2 className="h-4 w-4" />
                        <span className="sr-only">Edit Property Details</span>
                      </Button>
                    </div>
                    <h3 className="font-semibold mb-2">Property Details</h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      Type: {propertyData?.property_type ? propertyTypes[propertyData.property_type as keyof typeof propertyTypes] : 'Not specified'}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      Activity: {propertyData?.activity_type ? activityTypes[propertyData.activity_type as keyof typeof activityTypes] : 'Not specified'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Size: {formatSize(propertyData?.min_size || null, propertyData?.max_size || null)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="relative">
                    <div className="absolute right-0 top-0 flex items-center">
                      <Button variant="ghost" size="sm" className="h-8 px-2 opacity-70 hover:opacity-100">
                        <Users className="h-4 w-4" />
                        <span className="sr-only">Edit Specifications</span>
                      </Button>
                    </div>
                    <h3 className="font-semibold mb-2">Specifications</h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      Bedrooms: {propertyData?.bedrooms || 'Not specified'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Bathrooms: {propertyData?.bathrooms || 'Not specified'}
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute right-0 top-0 flex items-center">
                      <Button variant="ghost" size="sm" className="h-8 px-2 opacity-70 hover:opacity-100">
                        <Coins className="h-4 w-4" />
                        <span className="sr-only">Edit Budget</span>
                      </Button>
                    </div>
                    <h3 className="font-semibold mb-2">Budget</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatBudget(propertyData?.min_budget || null, propertyData?.max_budget || null, propertyData?.budget_frequency || null)}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute right-0 top-0 flex items-center">
                    <Button variant="ghost" size="sm" className="h-8 px-2 opacity-70 hover:opacity-100">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Edit Summary</span>
                    </Button>
                  </div>
                  <h3 className="font-semibold mb-2">Summary</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {propertyData?.description || 'Generating description...'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center p-8"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing your requirements...</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 