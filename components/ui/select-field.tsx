'use client';

import { Control } from 'react-hook-form';

import { FormFieldWrapper } from '@/components/ui/form-field-wrapper';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder: string;
  options: Option[];
}

export function SelectField({
  name,
  control,
  label,
  placeholder,
  options,
}: SelectFieldProps) {
  return (
    <FormFieldWrapper control={control} name={name} label={label}>
      {(field) => (
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value || undefined}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </FormFieldWrapper>
  );
}
