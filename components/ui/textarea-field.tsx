'use client';

import { ComponentProps } from 'react';
import { Control } from 'react-hook-form';

import { FormFieldWrapper } from '@/components/ui/form-field-wrapper';
import { Textarea } from '@/components/ui/textarea';

interface TextareaFieldProps extends Omit<ComponentProps<'textarea'>, 'name'> {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
}

export function TextareaField({
  name,
  control,
  label,
  placeholder,
  className,
  ...props
}: TextareaFieldProps) {
  return (
    <FormFieldWrapper control={control} name={name} label={label}>
      {(field) => (
        <Textarea
          placeholder={placeholder}
          className={className}
          {...props}
          {...field}
        />
      )}
    </FormFieldWrapper>
  );
}
