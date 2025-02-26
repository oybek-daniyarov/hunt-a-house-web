import { NumberInput } from '@/components/forms/fields';
import { FormFieldWrapper } from '@/components/forms/fields/form-field-wrapper';
import { NumberInputProps } from '@/components/forms/fields/number-input';
import { Input } from '@/components/ui/input';
import { LocationSearch } from '@/components/ui/location-search';
import MultipleSelector from '@/components/ui/multiple-selector';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

type NumberInputFieldProps = NumberInputProps & {
  label: string;
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
  label: string;
  placeholder?: string;
  maxSelected?: number;
};

export const LocationSearchField = ({
  name,
  label,
  placeholder = 'Enter a community, area or Emirate',
  maxSelected = 3,
}: LocationSearchFieldProps) => {
  return (
    <FormFieldWrapper name={name} label={label}>
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
  label: string;
};

export const InputField = ({ name, label }: InputFieldProps) => {
  return (
    <FormFieldWrapper name={name} label={label}>
      {(field) => <Input {...field} />}
    </FormFieldWrapper>
  );
};

type TextareaFieldProps = {
  name: string;
  label: string;
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
  label: string;
  options: { label: string; value: string }[];
};

export const SelectField = ({ name, label, options }: SelectFieldProps) => {
  return (
    <FormFieldWrapper name={name} label={label}>
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
