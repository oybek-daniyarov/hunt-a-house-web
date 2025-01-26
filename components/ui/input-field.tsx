'use client';

import { ComponentProps } from 'react';
import { Control } from 'react-hook-form';

import { FormFieldWrapper } from '@/components/ui/form-field-wrapper';
import { Input } from '@/components/ui/input';

interface InputFieldProps extends Omit<ComponentProps<'input'>, 'name'> {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  parseValue?: (value: string) => any;
}

export function InputField({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  parseValue,
  ...props
}: InputFieldProps) {
  return (
    <FormFieldWrapper control={control} name={name} label={label}>
      {(field) => (
        <Input
          type={type}
          placeholder={placeholder}
          {...props}
          {...field}
          value={field.value?.toString() || ''}
          onChange={(e) => {
            const value = e.target.value;
            field.onChange(parseValue ? parseValue(value) : value);
          }}
        />
      )}
    </FormFieldWrapper>
  );
}
