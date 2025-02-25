import { Control } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { LeadContactFormData } from './schema';

export type ContactMethod = {
  id: 'phone' | 'facebook' | 'whatsapp' | 'telegram';
  label: string;
  type: 'phone' | 'text';
  prefix?: string;
  placeholder?: string;
  description?: string;
};

type ContactMethodInputProps = {
  method: ContactMethod;
  control: Control<LeadContactFormData>;
};

export const ContactMethodInput = ({
  method,
  control,
}: ContactMethodInputProps) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      <FormField
        control={control}
        name={`contact.${method.id}`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{method.label}</FormLabel>
            <FormControl>
              {method.type === 'phone' ? (
                <PhoneInput
                  {...field}
                  value={field.value || ''}
                  className="w-full"
                  defaultCountry="AE"
                />
              ) : (
                <Input
                  {...field}
                  prefix={method.prefix}
                  value={field.value || ''}
                  type={method.type}
                  placeholder={
                    method.placeholder ||
                    `Enter your ${method.label.toLowerCase()}`
                  }
                />
              )}
            </FormControl>
            {method.description && (
              <FormDescription>{method.description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
