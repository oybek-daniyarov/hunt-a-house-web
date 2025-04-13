'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { InputField, SelectField } from '@/components/forms/fields';
import { LocationDisplay } from '@/components/listing/card/location-display';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { formatSize, formatToThousands } from '@/lib/utils/format-number';

// Replace the toast import with a simple alert for now
// import { toast } from '@/components/ui/use-toast';
// Import the API function to update leads (you'll need to create this)
// import { updateLead } from '@/lib/data/laravel/lead/lead.api';

// Define the form schema
const formSchema = z.object({
  status: z.string(), // Use string instead of enum to match any status type
  maxViews: z.coerce.number().int().min(1).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditLeadDialogProps {
  lead: App.Data.Lead.LeadData;
  open: boolean;
  returnUrl: string;
}

export function EditLeadDialog({ lead, open, returnUrl }: EditLeadDialogProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  // Initialize form with current lead values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: lead.status || 'active',
      maxViews: undefined, // You might want to fetch this from the lead if available
    },
  });

  // Handle form submission
  async function onSubmit(data: FormValues) {
    setIsPending(true);

    try {
      // Call your API to update the lead
      // await updateLead(lead.id, data);

      // For now, just log the data and show a success message
      console.log('Updating lead with data:', data);

      // Use alert instead of toast for now
      alert('Lead updated successfully');

      // Navigate back to the leads list
      router.push(returnUrl);
      router.refresh();
    } catch (error) {
      console.error('Failed to update lead:', error);
      alert('Failed to update the lead. Please try again.');
    } finally {
      setIsPending(false);
    }
  }

  // Handle dialog close
  function handleClose() {
    if (!isPending) {
      router.push(returnUrl);
    }
  }

  const statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Closed', value: 'closed' },
    { label: 'Pending', value: 'pending' },
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <SelectField
              name="status"
              label="Status"
              description="The current status of this lead."
              options={statusOptions}
            />
            <InputField
              name="maxViews"
              type="number"
              label="Maximum Views"
              description="The maximum number of times this lead can be viewed."
              min={1}
              max={10}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
