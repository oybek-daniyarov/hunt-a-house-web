'use client';

import { Control } from 'react-hook-form';

import { FormFieldWrapper } from '@/components/ui/form-field-wrapper';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';

interface MultipleSelectorFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  defaultOptions?: Option[];
  creatable?: boolean;
  emptyIndicator?: string;
  className?: string;
}

export function MultipleSelectorField({
  name,
  control,
  label,
  placeholder,
  defaultOptions = [],
  creatable = false,
  emptyIndicator,
  className,
}: MultipleSelectorFieldProps) {
  return (
    <FormFieldWrapper control={control} name={name} label={label}>
      {(field) => (
        <MultipleSelector
          placeholder={placeholder}
          {...field}
          defaultOptions={defaultOptions}
          className={className}
          creatable={creatable}
          emptyIndicator={emptyIndicator}
        />
      )}
    </FormFieldWrapper>
  );
}
