'use client';

import { ReactNode } from 'react';
import { Control } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface FormFieldWrapperProps {
  name: string;
  control: Control<any>;
  label: string;
  children: (field: any) => ReactNode;
}

export function FormFieldWrapper({
  name,
  control,
  label,
  children,
}: FormFieldWrapperProps) {
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
