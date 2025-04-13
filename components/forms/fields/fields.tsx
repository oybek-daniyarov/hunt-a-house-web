import { Country } from 'react-phone-number-input';

import { NumberInput } from '@/components/forms/fields';
import { FormFieldWrapper } from '@/components/forms/fields/form-field-wrapper';
import { NumberInputProps } from '@/components/forms/fields/number-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { LocationSearch } from '@/components/ui/location-search';
import MultipleSelector from '@/components/ui/multiple-selector';
import { PhoneInput } from '@/components/ui/phone-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

type NumberInputFieldProps = NumberInputProps & {
  label: React.ReactNode;
};

export const NumberInputField = ({
  name,
  label,
  ...props
}: NumberInputFieldProps) => {
  return (
    <FormFieldWrapper name={name} label={label}>
      {(field) => (
        <NumberInput
          {...field}
          {...props}
          value={field.value}
          onChange={(value) => field.onChange(value)}
        />
      )}
    </FormFieldWrapper>
  );
};

type LocationSearchFieldProps = {
  name: string;
  label: React.ReactNode;
  placeholder?: string;
  maxSelected?: number;
  description?: string;
};

export const LocationSearchField = ({
  name,
  label,
  placeholder = 'Enter a community, area or Emirate',
  maxSelected = 3,
  description,
}: LocationSearchFieldProps) => {
  return (
    <FormFieldWrapper name={name} label={label} description={description}>
      {(field) => (
        <LocationSearch
          value={field.value}
          onChange={field.onChange}
          placeholder={placeholder}
          maxSelected={maxSelected}
          disabled={field.disabled}
        />
      )}
    </FormFieldWrapper>
  );
};

type InputFieldProps = {
  name: string;
  label: React.ReactNode;
  type?: string;
  min?: number;
  max?: number;
  description?: string;
  placeholder?: string;
  className?: string;
};

export const InputField = ({
  name,
  label,
  type,
  min,
  max,
  description,
  placeholder,
  className,
}: InputFieldProps) => {
  return (
    <FormFieldWrapper
      name={name}
      label={label}
      description={description}
      className={className}
    >
      {(field) => (
        <Input
          {...field}
          type={type}
          min={min}
          max={max}
          placeholder={placeholder}
        />
      )}
    </FormFieldWrapper>
  );
};

type TextareaFieldProps = {
  name: string;
  label: React.ReactNode;
};

export const TextareaField = ({ name, label }: TextareaFieldProps) => {
  return (
    <FormFieldWrapper name={name} label={label}>
      {(field) => <Textarea {...field} />}
    </FormFieldWrapper>
  );
};

type SelectFieldProps = {
  name: string;
  label: React.ReactNode;
  options: { label: string; value: string }[];
  description?: React.ReactNode;
};

export const SelectField = ({
  name,
  label,
  options,
  description,
}: SelectFieldProps) => {
  return (
    <FormFieldWrapper name={name} label={label} description={description}>
      {(field) => (
        <Select {...field} onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder={label} />
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
};

export const MultipleSelectorField = ({
  name,
  label,
  options,
}: MultipleSelectorFieldProps) => {
  return (
    <FormFieldWrapper name={name} label={label}>
      {(field) => <MultipleSelector {...field} options={options} />}
    </FormFieldWrapper>
  );
};

type MultipleSelectorFieldProps = {
  name: string;
  label: string;
  options: { label: string; value: string }[];
};

//checkbox
type CheckboxFieldProps = {
  name: string;
  label: React.ReactNode;
  description?: React.ReactNode;
};

export const CheckboxField = ({
  name,
  label,
  description,
}: CheckboxFieldProps) => {
  return (
    <FormFieldWrapper
      name={name}
      label={label}
      reverseLabel
      description={description}
    >
      {(field) => (
        <Checkbox
          {...field}
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      )}
    </FormFieldWrapper>
  );
};

type PhoneInputFieldProps = {
  name: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  defaultCountry?: Country;
};

export const PhoneInputField = ({
  name,
  label,
  description,
  defaultCountry = 'AE',
}: PhoneInputFieldProps) => {
  return (
    <FormFieldWrapper name={name} label={label} description={description}>
      {(field) => <PhoneInput {...field} defaultCountry={defaultCountry} />}
    </FormFieldWrapper>
  );
};
