'use client';

import { createContext, useContext, useCallback, useEffect } from 'react';
import { type PropertyResponse } from "@/app/api/generate-property/schema";
import { useForm, UseFormReturn, FieldValues, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema } from "@/app/api/generate-property/schema";
import { Form } from "@/components/ui/form";

interface PropertyFormContextValue {
  form: UseFormReturn<PropertyResponse>;
  propertyData: PropertyResponse | null;
  getValue: <T>(path: Path<PropertyResponse>, defaultValue: T) => T;
  handleSubmit: () => Promise<boolean>;
  resetForm: () => void;
  isDirty: () => boolean;
}

const PropertyFormContext = createContext<PropertyFormContextValue | null>(null);

interface PropertyFormProviderProps {
  children: React.ReactNode;
  propertyData: PropertyResponse | null;
  onPropertyDataChange?: (data: PropertyResponse) => void;
}

const defaultValues: PropertyResponse = {
  location: {
    emirate: '',
    areas: [],
    communities: [],
  },
  property: {
    type: 1,
    activity: 1,
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
  propertyData,
  onPropertyDataChange,
}: PropertyFormProviderProps) {
  const form = useForm<PropertyResponse>({
    resolver: zodResolver(propertySchema),
    values: propertyData || undefined,
    defaultValues,
    mode: "onChange",
  });


  // Update form when propertyData changes
  useEffect(() => {
    if (propertyData) {
      form.reset(propertyData);
    }
  }, [propertyData, form]);

  const getValue = useCallback(<T,>(path: Path<PropertyResponse>, defaultValue: T): T => {
    const formValue = form.getValues(path);
    if (formValue !== undefined && formValue !== null) {
      return formValue as T;
    }

    // Use lodash get to safely access nested propertyData
    const propertyValue = path.split('.').reduce((obj: any, key) => obj?.[key], propertyData);
    if (propertyValue !== undefined && propertyValue !== null) {
      return propertyValue as T;
    }

    return defaultValue;
  }, [form, propertyData]);

  const handleSubmit = useCallback(async () => {
    const result = await form.trigger();
    if (result && onPropertyDataChange) {
      onPropertyDataChange(form.getValues());
    }
    return result;
  }, [form, onPropertyDataChange]);

  const resetForm = useCallback(() => {
    form.reset(propertyData || defaultValues);
  }, [form, propertyData]);

  const isDirty = useCallback(() => {
    return form.formState.isDirty;
  }, [form]);

  return (
    <PropertyFormContext.Provider value={{ form, propertyData, getValue, handleSubmit, resetForm, isDirty }}>
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
    throw new Error('usePropertyForm must be used within a PropertyFormProvider');
  }
  return context;
} 