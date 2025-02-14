'use client';

import { ReactNode } from 'react';
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface FormFieldWrapperProps {
  name: string;
  label: string;
  children: (field: ControllerRenderProps<FieldValues, string>) => ReactNode;
}

export function FormFieldWrapper({
  name,
  label,
  children,
}: FormFieldWrapperProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{children(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
