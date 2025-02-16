import { useState } from 'react';
import { experimental_useObject as useObject } from 'ai/react';
import { Building2, MapPin, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { LocationSearchResponseSchema } from '@/lib/ai/types';

interface PropertyInfoProps {
  listing: App.Data.Lead.LeadListData;
}

export function PropertyInfo({ listing }: PropertyInfoProps) {
  const [query, setQuery] = useState('');
  const { object, submit, isLoading, error } = useObject({
    api: '/api/property',
    schema: LocationSearchResponseSchema,
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Building2 className="h-4 w-4 text-primary" />
          <span className="font-medium">{listing.propertyTypeName}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">
            {listing.activityTypeName}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">
            {listing.emirateName}, {listing.areaName}
          </span>
        </div>
      </div>

      {/* AI Property Assistant */}
      <Card className="mt-4">
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="relative">
              <div className="relative flex items-center gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    placeholder="Ask about this property..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  onClick={() =>
                    submit({
                      query,
                      context: {
                        propertyType: listing.propertyTypeName,
                        activityType: listing.activityTypeName,
                        location: `${listing.emirateName}, ${listing.areaName}`,
                        budget: {
                          min: listing.minBudget,
                          max: listing.maxBudget,
                          frequency: listing.budgetFrequency,
                        },
                        size: {
                          min: listing.minSize,
                          max: listing.maxSize,
                        },
                        bedrooms: listing.bedrooms,
                        bathrooms: listing.bathrooms,
                        description: listing.description,
                      },
                    })
                  }
                  disabled={isLoading || !query}
                  size="sm"
                >
                  {isLoading ? 'Analyzing...' : 'Ask'}
                </Button>
              </div>
            </div>

            {/* Results Display */}
            {isLoading && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                <p className="text-sm text-destructive">{error.message}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
