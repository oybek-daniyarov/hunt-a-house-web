'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Path, useForm, UseFormReturn } from 'react-hook-form';

import { usePropertyGenerator } from '@/components/property-generator-ai/providers/property-generator-provider';
import { EditingSectionType } from '@/components/property-generator-ai/types';
import { Form } from '@/components/ui/form';
import {
  LocationSearchResponse,
  LocationSearchResponseSchema,
  PriceRange,
  Term,
} from '@/lib/ai/types';

interface PropertyFormContextValue {
  form: UseFormReturn<LocationSearchResponse>;
  propertyData: LocationSearchResponse | null;
  getValue: <T>(path: Path<LocationSearchResponse>, defaultValue: T) => T;
  handleSubmit: () => Promise<boolean>;
  handleSectionStepChange: (section: EditingSectionType) => void;
  isEditing: boolean;
  isCurrentEditingSection: (section: EditingSectionType) => boolean;
  filters: App.Data.Lead.LeadFiltersData;
  findName: (
    key: keyof App.Data.Lead.LeadFiltersData,
    id: number | string
  ) => string | undefined;
}

const PropertyFormContext = createContext<PropertyFormContextValue | null>(
  null
);

interface PropertyFormProviderProps {
  children: React.ReactNode;
  filters: App.Data.Lead.LeadFiltersData;
}

const defaultValues: LocationSearchResponse = {
  location: {
    emirateId: 0,
    emirateName: '',
    communityName: '',
    materializedPath: 'town',
  },
  price: {
    min: 0,
    max: 0,
    range: PriceRange.BudgetFriendly,
    term: Term.Daily,
  },
  listing: {
    type: '',
    activity: '',
    size: {
      min: 0,
      max: 0,
    },
    bedrooms: '',
    bathrooms: '',
  },
  content: {
    userAd: '',
    locationSummary: '',
  },
};

export function PropertyFormProvider({
  children,
  filters,
}: PropertyFormProviderProps) {
  const [sectionStep, setSectionStep] = useState<EditingSectionType>(null);
  const { propertyData, handlePropertyDataChange } = usePropertyGenerator();

  const isEditing = sectionStep !== null;

  const form = useForm<LocationSearchResponse>({
    resolver: zodResolver(LocationSearchResponseSchema),
    values: propertyData || undefined,
    defaultValues,
    mode: 'onChange',
  });

  // Update form when propertyData changes
  useEffect(() => {
    if (propertyData) {
      form.reset(propertyData);
    }
  }, [propertyData, form]);

  const getValue = useCallback(
    <T,>(path: Path<LocationSearchResponse>, defaultValue: T): T => {
      const formValue = form.getValues(path);
      if (formValue !== undefined && formValue !== null) {
        return formValue as T;
      }

      const propertyValue = path
        .split('.')
        .reduce((obj: any, key) => obj?.[key], propertyData);
      if (propertyValue !== undefined && propertyValue !== null) {
        return propertyValue as T;
      }

      return defaultValue;
    },
    [form, propertyData]
  );

  const handleSubmit = useCallback(async () => {
    const result = await form.trigger();
    if (result && handlePropertyDataChange) {
      handlePropertyDataChange(form.getValues());
    }
    return result;
  }, [form, handlePropertyDataChange]);

  const handleSectionStepChange = (section: EditingSectionType) => {
    setSectionStep(section);
  };

  const isCurrentEditingSection = (section: EditingSectionType) => {
    return sectionStep === section;
  };

  const findName = (
    key: keyof App.Data.Lead.LeadFiltersData,
    id: number | string
  ) => {
    return filters[key].find((filter) => filter.id === Number(id))?.name;
  };

  return (
    <PropertyFormContext.Provider
      value={{
        form,
        propertyData,
        getValue,
        handleSubmit,
        handleSectionStepChange,
        isEditing,
        isCurrentEditingSection,
        filters,
        findName,
      }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="space-y-4">
          {children}
        </form>
      </Form>
    </PropertyFormContext.Provider>
  );
}

export function usePropertyForm() {
  const context = useContext(PropertyFormContext);
  if (!context) {
    throw new Error(
      'usePropertyForm must be used within a PropertyFormProvider'
    );
  }
  return context;
}
