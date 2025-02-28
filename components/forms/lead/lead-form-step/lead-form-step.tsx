'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  LocationSearchField,
  NumberInputField,
  SelectField,
  SubmitButton,
  TextareaField,
} from '@/components/forms/fields';
import {
  LeadFormStepData,
  leadFormStepSchema,
} from '@/components/forms/lead/lead-form-step/schema';
import { useSteps } from '@/components/steps/step-provider';
import { Form } from '@/components/ui/form';

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
  'use no memo';
  const { updateStepData, goToNextStep } = useSteps();
  const form = useForm<LeadFormStepData>({
    resolver: zodResolver(leadFormStepSchema),
    defaultValues: {
      location: [],
      propertyType: filters.propertyTypes[0].id.toString(),
      activityType: filters.activityTypes[0].id.toString(),
      bedrooms: filters.bedrooms[0].id.toString(),
      bathrooms: filters.bathrooms[0].id.toString(),
      minSize: '',
      maxSize: '',
      minBudget: '',
      maxBudget: '',
      description: '',
      budgetFrequency: filters.budgetFrequency[0].id.toString(),
    },
  });

  const propertyTypeOptions = convertToOptions(filters.propertyTypes);
  const activityTypeOptions = convertToOptions(filters.activityTypes);
  const bedroomOptions = convertToOptions(filters.bedrooms);
  const bathroomOptions = convertToOptions(filters.bathrooms);
  const budgetFrequencyOptions = convertToOptions(filters.budgetFrequency);

  async function onSubmit(data: LeadFormStepData) {
    updateStepData({
      lead: data,
    });
    await goToNextStep();
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
            <SelectField
              name="budgetFrequency"
              label="Budget Frequency"
              options={budgetFrequencyOptions}
            />
          </div>

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
