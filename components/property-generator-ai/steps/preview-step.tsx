'use client';

import { motion } from 'framer-motion';

import { type PropertyResponse } from '@/components/property-generator-ai/schema';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ACTIVITY_TYPES,
  formatBudget,
  formatSize,
  PROPERTY_TYPES,
  PropertyDisplay,
  type ActivityType,
  type PropertyType,
} from '../components/property-display';
import { usePropertyForm } from '../providers/property-form-provider';

interface PreviewStepProps {
  onBack: () => void;
}

export function PreviewStep({ onBack }: PreviewStepProps) {
  const { getValue } = usePropertyForm();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mx-auto">
        <h2 className="text-xl font-medium">Preview Requirements</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="text-xs"
          >
            Back to Review
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-background border border-border/50 p-8 rounded-xl shadow-sm mx-auto"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="relative">
              <h4 className="font-semibold mb-2">Location</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <PropertyDisplay
                  label="Emirate"
                  value={getValue('location.emirate', '')}
                />
                <PropertyDisplay
                  label="Areas"
                  value={getValue('location.areas', []).join(', ')}
                />
                <PropertyDisplay
                  label="Communities"
                  value={getValue('location.communities', []).join(', ')}
                />
              </div>
            </div>

            <div className="relative">
              <h4 className="font-semibold mb-2">Property Details</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <PropertyDisplay
                  label="Type"
                  value={
                    PROPERTY_TYPES[
                      getValue(
                        'property.type',
                        1 as PropertyType
                      ) as PropertyType
                    ]
                  }
                />
                <PropertyDisplay
                  label="Activity"
                  value={
                    ACTIVITY_TYPES[
                      getValue(
                        'property.activity',
                        1 as ActivityType
                      ) as ActivityType
                    ]
                  }
                />
                <PropertyDisplay
                  label="Size"
                  value={formatSize(getValue('property.size', null))}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="relative">
              <h4 className="font-semibold mb-2">Specifications</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <PropertyDisplay
                  label="Bedrooms"
                  value={getValue<
                    PropertyResponse['specifications']['bedrooms']
                  >('specifications.bedrooms', 0).toString()}
                />
                <PropertyDisplay
                  label="Bathrooms"
                  value={getValue<
                    PropertyResponse['specifications']['bathrooms']
                  >('specifications.bathrooms', 0).toString()}
                />
              </div>
            </div>

            <div className="relative">
              <h4 className="font-semibold mb-2">Budget</h4>
              <div className="text-sm text-muted-foreground">
                <PropertyDisplay
                  label="Budget Range"
                  value={formatBudget(getValue('budget', null))}
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <h4 className="font-semibold mb-2">Summary</h4>
            <div className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <PropertyDisplay
                  label="Title"
                  value={getValue('content.title', '')}
                />
                <PropertyDisplay
                  label="Description"
                  value={getValue('content.description', '')}
                />
                <div className="flex flex-wrap gap-2">
                  {getValue('content.tags', []).map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
