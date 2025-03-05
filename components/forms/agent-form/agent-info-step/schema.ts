import { z } from 'zod';

export const agentInfoStepSchema = z.object({
  address: z.string().optional().nullable(),
  website: z.string().url('Please enter a valid URL'),
  reraNumber: z.string().min(1, 'RERA number is required'),
  tradeLicense: z.string().min(1, 'Trade license is required'),
  companyName: z.string().min(1, 'Company name is required'),
  companyType: z.string().min(1, 'Company type is required'),
  companySize: z.string().min(1, 'Company size is required'),
  locationId: z.string().min(1, 'Location is required'),
});

export type AgentInfoStepData = z.infer<typeof agentInfoStepSchema>;
