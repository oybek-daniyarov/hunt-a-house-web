import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { z } from "zod";
import { propertySchema } from "@/app/api/generate-property/schema";

type PropertyResponse = z.infer<typeof propertySchema>;

interface PreviewStepProps {
  propertyData: PropertyResponse | null;
  handleBackClick: () => void;
  handleSubmit: () => void;
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

export function PreviewStep({ propertyData, handleBackClick, handleSubmit }: PreviewStepProps) {
  return (
    <div  className="space-y-8">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <h2 className="text-xl font-medium">Preview Requirements</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackClick}
            className="text-xs"
          >
            Back to Review
          </Button>
          <Button
            size="sm"
            className="text-xs"
            onClick={handleSubmit}
          >
            Submit Requirements
          </Button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-background border border-border/50 p-8 rounded-xl shadow-sm max-w-4xl mx-auto"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="relative">
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-sm text-muted-foreground mb-1">Emirate: {propertyData?.emirate_name || 'Not specified'}</p>
              {propertyData?.areas && Array.isArray(propertyData.areas) && propertyData.areas.length > 0 && (
                <p className="text-sm text-muted-foreground mb-1">
                  Areas: {propertyData.areas.join(', ')}
                </p>
              )}
              {propertyData?.communities && Array.isArray(propertyData.communities) && propertyData.communities.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Communities: {propertyData.communities.join(', ')}
                </p>
              )}
            </div>
            <div className="relative">
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
              <h3 className="font-semibold mb-2">Specifications</h3>
              <p className="text-sm text-muted-foreground mb-1">
                Bedrooms: {propertyData?.bedrooms || 'Not specified'}
              </p>
              <p className="text-sm text-muted-foreground">
                Bathrooms: {propertyData?.bathrooms || 'Not specified'}
              </p>
            </div>
            <div className="relative">
              <h3 className="font-semibold mb-2">Budget</h3>
              <p className="text-sm text-muted-foreground">
                {formatBudget(propertyData?.min_budget || null, propertyData?.max_budget || null, propertyData?.budget_frequency || null)}
              </p>
            </div>
          </div>

          <div className="relative">
            <h3 className="font-semibold mb-2">Summary</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {propertyData?.description || 'Generating description...'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 