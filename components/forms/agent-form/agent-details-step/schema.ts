import { z } from 'zod';

export const agentDetailsStepSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(1, 'Phone number is required'),
  additionalInfo: z.string().optional().nullable(),
  terms: z
    .boolean()
    .refine((val) => val, 'Please accept the terms and conditions'),
});

export type AgentDetailsStepData = z.infer<typeof agentDetailsStepSchema>;
