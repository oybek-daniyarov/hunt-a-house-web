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
import {
  PropertyResponse,
  propertySchema,
} from '@/components/property-generator-ai/schema';
import { EditingSectionType } from '@/components/property-generator-ai/types';
import { Form } from '@/components/ui/form';

interface PropertyFormContextValue {
  form: UseFormReturn<PropertyResponse>;
  propertyData: PropertyResponse | null;
  getValue: <T>(path: Path<PropertyResponse>, defaultValue: T) => T;
  handleSubmit: () => Promise<boolean>;
  handleSectionStepChange: (section: EditingSectionType) => void;
  isEditing: boolean;
  isCurrentEditingSection: (section: EditingSectionType) => boolean;
  filters: App.Data.Lead.LeadFiltersData;
}

const PropertyFormContext = createContext<PropertyFormContextValue | null>(
  null
);

interface PropertyFormProviderProps {
  children: React.ReactNode;
  filters: App.Data.Lead.LeadFiltersData;
}

const defaultValues: PropertyResponse = {
  location: {
    emirate: '',
    areas: [],
    communities: [],
  },
  property: {
    type: '',
    activity: '',
    size: {
      min: 200,
      max: 200,
    },
  },
  specifications: {
    bedrooms: 1,
    bathrooms: 1,
  },
  budget: {
    min: 20000,
    max: 40000,
    frequency: null,
  },
  content: {
    description: '',
    title: '',
    tags: [],
  },
  seo: {
    title: '',
    description: '',
  },
};

export function PropertyFormProvider({
  children,
  filters,
}: PropertyFormProviderProps) {
  const [sectionStep, setSectionStep] = useState<EditingSectionType>(null);
  const { propertyData, handlePropertyDataChange } = usePropertyGenerator();

  const isEditing = sectionStep !== null;

  const form = useForm<PropertyResponse>({
    resolver: zodResolver(propertySchema),
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
    <T,>(path: Path<PropertyResponse>, defaultValue: T): T => {
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
