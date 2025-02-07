'use client';

import { useState } from 'react';
import { experimental_useObject as useObject } from 'ai/react';
import { Bath, BedDouble, DollarSign, Ruler, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import {
  LocationSearchResponse,
  LocationSearchResponseSchema,
} from '@/lib/ai/types';

function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function formatTerm(term: string): string {
  const map: Record<string, string> = {
    DAILY: 'per day',
    MONTHLY: 'per month',
    YEARLY: 'per year',
  };
  return map[term] || term;
}

function PropertyCard({ property }: { property: LocationSearchResponse }) {
  return (
    <Card className="bg-card">
      {property?.location?.emirateId && (
        <CardHeader className="space-y-2">
          <CardTitle>{property.location.emirateId}</CardTitle>
        </CardHeader>
      )}
      {property?.location?.materializedPath && (
        <CardHeader className="space-y-2">
          <CardTitle>
            <div className="flex items-center gap-2">
              <span>{property.location.communityName}</span>
              <span className="text-muted-foreground">
                ({property.location.materializedPath})
              </span>
            </div>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-6">
        {/* Key Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {property.listing?.bedrooms && (
            <div className="flex items-center gap-2">
              <BedDouble className="h-4 w-4 text-muted-foreground" />
              <span>
                {property.listing.bedrooms === '0'
                  ? 'Studio'
                  : `${property.listing.bedrooms} Beds`}
              </span>
            </div>
          )}
          {property.listing?.bathrooms && (
            <div className="flex items-center gap-2">
              <Bath className="h-4 w-4 text-muted-foreground" />
              <span>{property.listing.bathrooms} Baths</span>
            </div>
          )}
          {property.listing?.size?.min && property.listing?.size?.max && (
            <div className="flex items-center gap-2">
              <Ruler className="h-4 w-4 text-muted-foreground" />
              <span>
                {property.listing?.size?.min} - {property.listing?.size?.max}{' '}
                sqft
              </span>
            </div>
          )}
          {property.price?.min && property.price?.max && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>
                {property.price?.min} - {property.price?.max} AED{' '}
                {formatTerm(property.price?.term)}
              </span>
            </div>
          )}
        </div>

        <Separator />

        {/* Property Details Table */}
        <Table>
          <TableBody>
            {property.listing?.activity && (
              <TableRow>
                <TableCell className="font-medium">Activity</TableCell>
                <TableCell className="capitalize">
                  {property.listing.activity}
                </TableCell>
              </TableRow>
            )}
            {property.listing?.type && (
              <TableRow>
                <TableCell className="font-medium">Property Type</TableCell>
                <TableCell className="capitalize">
                  {property.listing.type}
                </TableCell>
              </TableRow>
            )}
            {property.listing?.size?.min && property.listing?.size?.max && (
              <TableRow>
                <TableCell className="font-medium">Size</TableCell>
                <TableCell>
                  {property.listing.size.min} - {property.listing.size.max} sqft
                </TableCell>
              </TableRow>
            )}
            {property.price?.min && property.price?.max && (
              <TableRow>
                <TableCell className="font-medium">Price Range</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>
                      <span className="font-medium">Budget Range:</span>{' '}
                      {formatCurrency(property.price.min)} -{' '}
                      {formatCurrency(property.price.max)} AED
                    </div>
                    <div>
                      <span className="font-medium">Term:</span>{' '}
                      {formatTerm(property.price.term)}
                    </div>
                    <div>
                      <span className="font-medium">Category:</span>{' '}
                      {property.price.range}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Separator />

        {/* Description */}
        <div className="space-y-2">
          {property.content?.userAd && (
            <>
              <h3 className="font-medium mb-2">Ad example</h3>
              <p className="text-sm text-muted-foreground">
                {property.content?.userAd}
              </p>
            </>
          )}

          {property.content?.locationSummary && (
            <>
              <h3 className="font-medium mb-2">Property Summary</h3>
              <p className="text-sm text-muted-foreground">
                {property.content.locationSummary}
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Page() {
  const [query, setQuery] = useState('');
  const { object, submit, isLoading, error } =
    useObject<LocationSearchResponse>({
      api: '/api/property',
      schema: LocationSearchResponseSchema,
    });

  console.log(object);

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Card className="shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">
            AI Property Search
          </CardTitle>
          <CardDescription>
            Describe your ideal property and let our AI find the perfect match
            for you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Input Section */}
          <div className="relative">
            <div className="relative flex items-center gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  placeholder="Describe your ideal property..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                onClick={() => submit({ query })}
                disabled={isLoading || !query}
                className="min-w-[100px]"
              >
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <p className="text-sm text-destructive">
                {error instanceof Error ? error.message : 'An error occurred'}
              </p>
            </div>
          )}

          {/* Results Display */}
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          )}

          {object && (
            <div className="mt-6">
              <PropertyCard property={object as LocationSearchResponse} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
