"use client";

import { useEffect, useState } from "react";
import { experimental_useObject as useObject } from "ai/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  AlertCircle, 
  MapPin, 
  Building2, 
  Home, 
  Bed,
  Ruler, 
  Coins,
  FileText,
  Building,
  Timer,
  CalendarClock,
  Check
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { propertySchema } from "../../app/api/generate-property/schema";
import type { z } from "zod";

type PropertyData = z.infer<typeof propertySchema>;

interface PropertyDescriptionGeneratorProps {
  onGenerate: (data: PropertyData) => void;
}

const demoData = {
  emirate_name: "Dubai",
  areas: ["Dubai Marina", "JBR"],
  communities: ["Marina Gate", "Marina Promenade"],
  property_type: 1,
  activity_type: 1,
  bedrooms: "2",
  bathrooms: "2",
  min_size: 1200,
  max_size: 1500,
  min_budget: 120000,
  max_budget: 150000,
  budget_frequency: "yearly",
  description: "Modern apartment with sea view, fully fitted kitchen, and parking. Preferably in a building with good amenities including gym and pool."
} as const;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function PropertyDescriptionGenerator({ onGenerate }: PropertyDescriptionGeneratorProps) {
  const [description, setDescription] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<PropertyData | null>(null);
  
  const { object: partialData, submit, isLoading, error } = useObject<PropertyData>({
    api: "/api/generate-property",
    schema: propertySchema,
  });

  const propertyData = partialData as PropertyData | null;
  const hasPartialData = propertyData && Object.keys(propertyData).length > 0;

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setShowResults(true);
    setIsEditing(false);
    await submit({ description });
    if (propertyData && isComplete(propertyData)) {
      setEditedData(propertyData);
    }
  };

  const handleNewSearch = () => {
    setShowResults(false);
    setIsEditing(false);
    setEditedData(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
    if (propertyData && !editedData) {
      setEditedData(propertyData);
    }
  };

  const handleSubmit = () => {
    if (editedData && isComplete(editedData)) {
      onGenerate(editedData);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const renderPropertyContent = (data: typeof demoData | PropertyData) => (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>Location</span>
        </div>
        <div className="pl-6">
          <div className="text-lg font-medium">{data.emirate_name}</div>
          {data.areas?.length > 0 && (
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <Building2 className="h-3.5 w-3.5 shrink-0" />
              <div className="text-sm">{data.areas.join(" • ")}</div>
            </div>
          )}
          {data.communities && data.communities.length > 0 && (
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <Home className="h-3.5 w-3.5 shrink-0" />
              <div className="text-sm">{data.communities.join(" • ")}</div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building className="h-4 w-4" />
          <span>Property Details</span>
        </div>
        <div className="pl-6 grid grid-cols-2 gap-x-12 gap-y-4">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Home className="h-3.5 w-3.5" />
              <div className="text-sm">Type</div>
            </div>
            <div className="mt-0.5">{data.property_type === 1 ? "Apartment" : 
                  data.property_type === 2 ? "Villa" : 
                  data.property_type === 3 ? "Townhouse" : "Other"}</div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarClock className="h-3.5 w-3.5" />
              <div className="text-sm">Purpose</div>
            </div>
            <div className="mt-0.5">{data.activity_type === 1 ? "Buy" :
                  data.activity_type === 2 ? "Rent Long Term" :
                  data.activity_type === 3 ? "Rent Short Term" : "Other"}</div>
          </div>
          {(data.min_size || data.max_size) && (
            <div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Ruler className="h-3.5 w-3.5" />
                <div className="text-sm">Size</div>
              </div>
              <div className="mt-0.5">{data.min_size || "?"} - {data.max_size || "?"} sqft</div>
            </div>
          )}
          {(data.bedrooms || data.bathrooms) && (
            <div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Bed className="h-3.5 w-3.5" />
                <div className="text-sm">Bedrooms</div>
              </div>
              <div className="mt-0.5">{data.bedrooms || "Any"}</div>
            </div>
          )}
        </div>
      </div>

      {(data.min_budget || data.max_budget) && (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Coins className="h-4 w-4" />
            <span>Budget</span>
          </div>
          <div className="pl-6">
            <div className="text-lg">
              {formatCurrency(data.min_budget)} - {formatCurrency(data.max_budget)}
            </div>
            {data.budget_frequency && (
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <Timer className="h-3.5 w-3.5" />
                <span className="text-sm">{data.budget_frequency}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {data.description && (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>Additional Requirements</span>
          </div>
          <div className="pl-6">
            <p className="text-muted-foreground leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderSteps = () => (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex flex-col items-center gap-2">
          <div className={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm",
            !showResults ? "border-primary bg-primary text-white" : "border-primary bg-primary/10 text-primary"
          )}>
            {!showResults ? "1" : <Check className="h-4 w-4" />}
          </div>
          <div className="text-xs font-medium">Describe</div>
        </div>
        
        <div className="w-24 h-[2px] bg-border relative top-[-8px]">
          <div className={cn(
            "h-full bg-primary transition-all",
            showResults ? "w-full" : "w-0"
          )} />
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm",
            showResults && !isEditing ? "border-primary bg-primary text-white" : 
            showResults ? "border-primary bg-primary/10 text-primary" : 
            "border-border bg-muted text-muted-foreground"
          )}>
            2
          </div>
          <div className="text-xs font-medium">Review</div>
        </div>

        <div className="w-24 h-[2px] bg-border relative top-[-8px]">
          <div className={cn(
            "h-full bg-primary transition-all",
            isEditing ? "w-full" : "w-0"
          )} />
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm",
            isEditing ? "border-primary bg-primary text-white" : 
            "border-border bg-muted text-muted-foreground"
          )}>
            3
          </div>
          <div className="text-xs font-medium">Customize</div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="relative max-w-3xl mx-auto">
      {renderSteps()}
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="input"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative"
          >
            <div className="group relative">
              <Textarea
                placeholder="Describe your dream property..."
                value={description}
                onChange={handleDescriptionChange}
                className="min-h-[120px] max-h-[200px] resize-none bg-background text-lg p-6 border border-border/50 focus:border-primary/20 transition-colors rounded-xl shadow-sm"
              />
              <div className="absolute inset-0 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                <div className="absolute inset-0 border-2 border-primary/20 rounded-xl" />
              </div>
            </div>
            <Button 
              onClick={handleGenerate} 
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
                  Generating
                </>
              ) : (
                "Generate"
              )}
            </Button>

            {error && (
              <motion.div {...fadeInUp}>
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error.toString()}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </motion.div>
        ) : hasPartialData ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-background border border-border/50 p-8 rounded-xl shadow-sm">
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-medium">Generated Requirements</h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNewSearch}
                      className="text-xs"
                    >
                      New Description
                    </Button>
                    {!isEditing ? (
                      <Button
                        size="sm"
                        onClick={handleEdit}
                        className="text-xs"
                      >
                        Edit Fields
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={handleSubmit}
                        className="text-xs"
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </div>
                {isEditing ? (
                  <div className="space-y-8">
                    <p className="text-sm text-muted-foreground">
                      Edit mode coming soon... This will allow you to adjust any generated fields before submission.
                    </p>
                    {renderPropertyContent(editedData || propertyData)}
                  </div>
                ) : (
                  renderPropertyContent(propertyData)
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center p-8"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Generating requirements...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function formatCurrency(value: number | null) {
  if (!value) return "N/A";
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(value);
}

function isComplete(data: Partial<PropertyData>): data is PropertyData {
  return propertySchema.safeParse(data).success;
} 