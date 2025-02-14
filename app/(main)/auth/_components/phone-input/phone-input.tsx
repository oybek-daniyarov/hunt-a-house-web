'use client';

import { forwardRef, useState } from 'react';
import i18nIsoCountries from 'i18n-iso-countries';
import enCountries from 'i18n-iso-countries/langs/en.json';
import {
  getExampleNumber,
  isValidPhoneNumber as matchIsValidPhoneNumber,
  parsePhoneNumber,
  type CountryCallingCode,
  type E164Number,
} from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';
import PhoneInput, { type Country } from 'react-phone-number-input/input';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ComboboxCountryInput } from './combobox';
import {
  getCountriesOptions,
  isoToEmoji,
  replaceNumbersWithZeros,
} from './helpers';

type CountryOption = {
  value: Country;
  label: string;
  indicatif: CountryCallingCode;
};

i18nIsoCountries.registerLocale(enCountries);

interface PhoneInputWithCountryProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: string, isValid: boolean) => void;
}

export const PhoneInputWithCountry = forwardRef<
  HTMLInputElement,
  PhoneInputWithCountryProps
>(({ className, onValueChange, ...props }, ref) => {
  const options = getCountriesOptions();
  const defaultCountry = parsePhoneNumber('+33606060606')?.country;
  const defaultCountryOption = options.find(
    (option) => option.value === defaultCountry
  );

  const [country, setCountry] = useState<CountryOption>(
    defaultCountryOption || options[0]!
  );
  const [phoneNumber, setPhoneNumber] = useState<E164Number>();

  const placeholder = replaceNumbersWithZeros(
    getExampleNumber(country.value, examples)!.formatInternational()
  );

  const onCountryChange = (value: CountryOption) => {
    setPhoneNumber(undefined);
    setCountry(value);
    onValueChange?.('', false);
  };

  const isValidPhoneNumber = matchIsValidPhoneNumber(phoneNumber ?? '');

  return (
    <div className={cn('flex gap-2', className)}>
      <ComboboxCountryInput
        value={country}
        onValueChange={onCountryChange}
        options={options}
        placeholder="Find your country..."
        renderOption={({ option }) =>
          `${isoToEmoji(option.value)} ${option.label}`
        }
        renderValue={(option) => option.label}
        emptyMessage="No country found."
      />
      <PhoneInput
        {...props}
        ref={ref}
        international
        withCountryCallingCode
        country={country.value.toUpperCase() as Country}
        value={phoneNumber}
        inputComponent={Input}
        placeholder={placeholder}
        onChange={(value) => {
          setPhoneNumber(value);
          onValueChange?.(
            value || '',
            !!value && matchIsValidPhoneNumber(value)
          );
        }}
      />
    </div>
  );
});

PhoneInputWithCountry.displayName = 'PhoneInputWithCountry';
