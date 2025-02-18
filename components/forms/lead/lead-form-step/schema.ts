import { z } from 'zod';

export const leadFormStepSchema = z
  .object({
    location: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      )
      .min(1, 'Location is required'),
    propertyType: z.string().min(1, 'Property type is required'),
    activityType: z.string().min(1, 'Activity type is required'),
    budgetFrequency: z.string().min(1, 'Budget frequency is required'),
    bedrooms: z.string(),
    bathrooms: z.string(),
    minSize: z.string().min(1, 'Min size is required'),
    maxSize: z.string().min(1, 'Max size is required'),
    minBudget: z.string().min(1, 'Min budget is required'),
    maxBudget: z.string().min(1, 'Max budget is required'),
    description: z.string().min(1, 'Description is required'),
  })
  .superRefine((data, ctx) => {
    if (parseFloat(data.minSize) > parseFloat(data.maxSize)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['minSize'],
        message: 'Min size must be less than max size',
      });
    }
    if (parseFloat(data.minBudget) > parseFloat(data.maxBudget)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['minBudget'],
        message: 'Min budget must be less than max budget',
      });
    }
  });

export type LeadFormStepData = z.infer<typeof leadFormStepSchema>;
