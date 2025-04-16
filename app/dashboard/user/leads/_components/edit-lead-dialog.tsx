'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { LocationDisplay } from '@/components/listing/card/location-display';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatSize, formatToThousands } from '@/lib/utils/format-number';
import { LeadEditForm } from './lead-edit-form';

interface EditLeadDialogProps {
  lead: App.Data.Lead.LeadData;
  open: boolean;
}

export function EditLeadDialog({ lead, open }: EditLeadDialogProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get('page');
  const returnUrl = `${pathname}${page ? `?page=${page}` : ''}`;

  const onOpenChange = (open: boolean) => {
    if (!open) {
      onSuccess();
    }
  };

  const onSuccess = () => {
    router.push(returnUrl);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Listing</DialogTitle>
          <DialogDescription>
            Update the status and maximum views for this listing.
          </DialogDescription>
        </DialogHeader>

        {/* Lead Summary Card */}
        <Card className="bg-muted/50">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{lead.propertyTypeName}</h3>
                <p className="text-sm text-muted-foreground">
                  {lead.activityTypeName}
                </p>
              </div>
              <Badge variant={lead.isActive ? 'default' : 'secondary'}>
                {lead.status || (lead.isActive ? 'Active' : 'Inactive')}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-muted-foreground">Location:</div>{' '}
                {lead.locations && lead.locations.length > 0 ? (
                  <LocationDisplay locations={lead.locations} />
                ) : (
                  <span className="text-gray-500">N/A</span>
                )}
              </div>
              <div>
                <div className="text-muted-foreground">Size:</div>{' '}
                {lead.minSize && lead.maxSize
                  ? `${formatSize(lead.minSize)} - ${formatSize(lead.maxSize)}`
                  : lead.minSize
                    ? formatSize(lead.minSize)
                    : lead.maxSize
                      ? formatSize(lead.maxSize)
                      : 'N/A'}
              </div>
              <div>
                <div className="text-muted-foreground">Bedrooms/Bathrooms:</div>{' '}
                {lead.bedrooms || '0'} bed / {lead.bathrooms || '0'} bath
              </div>
              <div>
                <div className="text-muted-foreground">Budget:</div>{' '}
                {lead.minBudget && lead.maxBudget
                  ? `${formatToThousands(lead.minBudget)} - ${formatToThousands(lead.maxBudget)} AED`
                  : lead.minBudget
                    ? formatToThousands(lead.minBudget) + ' AED'
                    : 'N/A'}
                {lead.budgetFrequency &&
                  ` (${lead.budgetFrequency.replace('_', ' ')})`}
              </div>
            </div>

            {lead.description && (
              <div className="text-sm">
                <span className="text-muted-foreground">Description:</span>{' '}
                <p className="mt-1">{lead.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <LeadEditForm lead={lead} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}
