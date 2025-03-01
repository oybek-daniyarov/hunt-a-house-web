'use client';

import { ReactNode } from 'react';
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface FormFieldWrapperProps {
  name: string;
  label: React.ReactNode;
  children: (field: ControllerRenderProps<FieldValues, string>) => ReactNode;
  reverseLabel?: boolean;
  description?: React.ReactNode;
}

export function FormFieldWrapper({
  name,
  label,
  children,
  description,
  reverseLabel = false,
}: FormFieldWrapperProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={
            reverseLabel
              ? 'flex flex-row-reverse flex-wrap items-center gap-2 space-y-0 justify-end'
              : ''
          }
        >
          <FormLabel>{label}</FormLabel>
          <FormControl>{children(field)}</FormControl>
          {description && (
            <FormDescription
              className={reverseLabel ? 'ml-auto basis-full' : ''}
            >
              {description}
            </FormDescription>
          )}
          <FormMessage className={reverseLabel ? 'ml-auto basis-full' : ''} />
        </FormItem>
      )}
    />
  );
}
