import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

export const leadContactFormSchema = z.object({
  contact: z
    .object({
      phone: z
        .string()
        .refine(
          (val) => !val || isValidPhoneNumber(val),
          'Invalid phone number'
        ),

      facebook: z
        .string()
        .nullable()
        .optional()
        .refine(
          (val) => !val || /^[a-zA-Z0-9.]+$/.test(val),
          'Facebook username should only contain letters, numbers, and periods'
        ),
      whatsapp: z
        .string()
        .nullable()
        .optional()
        .refine(
          (val) => !val || isValidPhoneNumber(val),
          'Invalid phone number'
        ),
      telegram: z
        .string()
        .nullable()
        .optional()
        .refine(
          (val) => !val || /^[a-zA-Z0-9_]{5,32}$/.test(val),
          'Telegram username should be 5-32 characters and contain only letters, numbers, and underscores'
        ),
    })
    .refine(
      (data) => {
        // Check if at least one field has a non-null, non-empty value
        return Object.values(data).some(
          (value) =>
            value !== null && value !== undefined && value.trim() !== ''
        );
      },
      {
        message: 'Please provide at least one contact method',
      }
    ),
});

export type LeadContactFormData = z.infer<typeof leadContactFormSchema>;
