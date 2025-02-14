'use client';

import { ComponentProps } from 'react';

import { Input } from '@/components/ui/input';

export type NumberInputProps = ComponentProps<typeof Input> & {
  name: string;
  placeholder?: string;
  currency?: string;
  locale?: string;
  prefix?: string;
  suffix?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export default function NumberInput({
  name,
  placeholder,
  currency,
  locale = 'en-AE',
  prefix,
  suffix,
  value = '',
  onChange,
  ...props
}: NumberInputProps) {
  const formatNumber = (value: string) => {
    const number = parseInt(value.replace(/[^0-9]/g, ''), 10);
    if (isNaN(number)) return '';
    return new Intl.NumberFormat(locale, {
      style: currency ? 'currency' : 'decimal',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const numericValue = e.target.value.replace(/[^0-9]/g, '');
      onChange(numericValue);
    }
  };

  return (
    <div className="relative flex items-center">
      {prefix && (
        <span className="absolute start-3 text-muted-foreground">{prefix}</span>
      )}
      <Input
        name={name}
        value={formatNumber(value)}
        onChange={handleChange}
        placeholder={placeholder}
        className={`text-end ${prefix ? 'ps-12' : ''}`}
        inputMode="numeric"
        {...props}
      />
      {suffix && (
        <span className="absolute end-3 text-muted-foreground">{suffix}</span>
      )}
    </div>
  );
}
