import { z } from 'zod';

export const leadContactFormSchema = z.object({
  contact: z
    .object({
      whatsapp: z.object({
        active: z.boolean(),
        value: z.string(),
      }),
      phone: z.object({
        active: z.boolean(),
        value: z.string(),
      }),
      email: z.object({
        active: z.boolean(),
        value: z
          .string()
          .refine(
            (val) => !val || z.string().email().safeParse(val).success,
            'Please enter a valid email address'
          ),
      }),
      telegram: z.object({
        active: z.boolean(),
        value: z.string(),
      }),
    })
    .refine(
      (data) =>
        Object.values(data).some((method) => method.active && method.value),
      {
        message:
          'Please select at least one contact method and provide its value',
      }
    ),
});

export type LeadContactFormData = z.infer<typeof leadContactFormSchema>;
