'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  LocationSearchField,
  NumberInputField,
  SelectField,
  SubmitButton,
  TextareaField,
} from '@/components/forms/fields';
import { useSteps } from '@/components/steps/step-provider';
import { Form } from '@/components/ui/form';

const leadFormStepSchema = z
  .object({
    location: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      )
      .min(1, 'Location is required'),
    propertyType: z.string().min(1, 'Property type is required'),
    activityType: z.string().min(1, 'Activity type is required'),
    bedrooms: z.string(),
    bathrooms: z.string(),
    minSize: z.string().min(1, 'Min size is required'),
    maxSize: z.string().min(1, 'Max size is required'),
    minBudget: z.string().min(1, 'Min budget is required'),
    maxBudget: z.string().min(1, 'Max budget is required'),
    description: z.string().min(1, 'Description is required'),
  })
  .superRefine((data, ctx) => {
    if (parseFloat(data.minSize) > parseFloat(data.maxSize)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['minSize'],
        message: 'Min size must be less than max size',
      });
    }
    if (parseFloat(data.minBudget) > parseFloat(data.maxBudget)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['minBudget'],
        message: 'Min budget must be less than max budget',
      });
    }
  });

const convertToOptions = (items: { id: number | string; name: string }[]) => {
  return items.map((item) => ({
    label: item.name,
    value: item.id.toString(),
  }));
};

type LeadFormStepProps = {
  filters: App.Data.Lead.LeadFiltersData;
};

export function LeadFormStep({ filters }: LeadFormStepProps) {
  const { updateStepData, goToNextStep } = useSteps();
  const form = useForm<z.infer<typeof leadFormStepSchema>>({
    resolver: zodResolver(leadFormStepSchema),
    defaultValues: {
      location: [],
      propertyType: '',
      activityType: '',
      bedrooms: '',
      bathrooms: '',
      minSize: '',
      maxSize: '',
      minBudget: '',
      maxBudget: '',
      description: '',
    },
  });

  const propertyTypeOptions = convertToOptions(filters.propertyTypes);
  const activityTypeOptions = convertToOptions(filters.activityTypes);
  const bedroomOptions = convertToOptions(filters.bedrooms);
  const bathroomOptions = convertToOptions(filters.bathrooms);

  async function onSubmit(data: z.infer<typeof leadFormStepSchema>) {
    updateStepData({
      lead: data,
    });
    goToNextStep();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <LocationSearchField name="location" label="Location*" />
          </div>

          <SelectField
            name="propertyType"
            label="Property Type*"
            options={propertyTypeOptions}
          />

          <SelectField
            name="activityType"
            label="Activity Type*"
            options={activityTypeOptions}
          />

          <SelectField
            name="bedrooms"
            label="Bedrooms"
            options={bedroomOptions}
          />

          <SelectField
            name="bathrooms"
            label="Bathrooms"
            options={bathroomOptions}
          />

          <NumberInputField name="minSize" label="Min Size" prefix="sqft" />

          <NumberInputField name="maxSize" label="Max Size" prefix="sqft" />

          <NumberInputField name="minBudget" label="Min Budget" prefix="AED" />

          <NumberInputField name="maxBudget" label="Max Budget" prefix="AED" />

          <div className="col-span-2">
            <TextareaField name="description" label="Description" />
          </div>

          {form.formState.errors.root && (
            <p className="col-span-2 text-sm font-medium text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}

          <SubmitButton className="col-span-2" text="Next" />
        </div>
      </form>
    </Form>
  );
}
