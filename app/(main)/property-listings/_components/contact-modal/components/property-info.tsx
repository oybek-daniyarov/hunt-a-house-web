import { useState } from 'react';
import { experimental_useObject as useObject } from 'ai/react';
import { Building2, MapPin, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { LocationSearchResponseSchema } from '@/lib/ai/property.ai';

interface PropertyInfoProps {
  listing: App.Data.Lead.LeadListResponse;
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
          <span className="font-medium">{listing.property_type_name}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">
            {listing.activity_type_name}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">
            {listing.emirate_name}, {listing.area_name}
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
                        propertyType: listing.property_type_name,
                        activityType: listing.activity_type_name,
                        location: `${listing.emirate_name}, ${listing.area_name}`,
                        budget: {
                          min: listing.min_budget,
                          max: listing.max_budget,
                          frequency: listing.budget_frequency,
                        },
                        size: {
                          min: listing.min_size,
                          max: listing.max_size,
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

            {object && (
              <div className="rounded-lg border bg-muted/50 p-3">
                <p className="text-sm">{object.response}</p>
                {object.suggestions && object.suggestions.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs font-medium">
                      Similar properties you might like:
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {object.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
