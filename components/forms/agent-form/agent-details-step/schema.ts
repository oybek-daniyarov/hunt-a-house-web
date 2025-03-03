import { z } from 'zod';

export const agentDetailsStepSchema = z.object({
  address: z.string().optional().nullable(),
  website: z.string().url('Please enter a valid URL').optional().nullable(),
  reraNumber: z.string().optional().nullable(),
  tradeLicense: z.string().optional().nullable(),
  additionalInfo: z.string().optional().nullable(),
  terms: z
    .boolean()
    .refine((val) => val, 'Please accept the terms and conditions'),
});

export type AgentDetailsStepData = z.infer<typeof agentDetailsStepSchema>;
