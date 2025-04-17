'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { InputField, SelectField } from '@/components/forms/fields';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import {
  handleFormError,
  handleFormSuccess,
} from '@/lib/client/laravel/helpers/form.helpers';
import { updateMineLeadAction } from '@/lib/data/laravel/lead/lead.actions';

// Define the form schema
const formSchema = z.object({
  status: z.union([
    z.literal('active'),
    z.literal('closed'),
    z.literal('pending'),
    z.literal('expired'),
  ]),
  maxViews: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface LeadEditFormProps {
  lead: App.Data.Lead.LeadData;
  onSuccess?: () => void;
}

export function LeadEditForm({ lead, onSuccess }: LeadEditFormProps) {
  'use no memo';
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: lead.status || 'active',
      maxViews: String(lead.maxViews) || '10',
    },
  });

  // Handle form submission
  async function onSubmit(data: FormValues) {
    const result = await updateMineLeadAction(lead.id, {
      status: data.status,
      maxViews: Number(data.maxViews),
    });
    console.log(result);
    if (!result.success) {
      handleFormError(form, result.error, 'Update lead failed');
      return;
    }
    handleFormSuccess('Lead updated successfully');
    setIsLoading(false);
    onSuccess?.();
  }

  const statusOptions: {
    label: string;
    value: App.Enums.LeadStatus;
  }[] = [
    { label: 'Active', value: 'active' },
    { label: 'Closed', value: 'closed' },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <SelectField
          name="status"
          label="Status"
          description="The current status of this listing."
          options={statusOptions}
        />
        <InputField
          name="maxViews"
          type="number"
          label="Maximum Views"
          description="The maximum number of times this listing can be viewed."
          // min={
          //   lead.currentViews && lead.currentViews > 0 ? lead.currentViews : 1
          // }
          max={10}
        />

        <DialogFooter className="gap-2 lg:gap-0">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
