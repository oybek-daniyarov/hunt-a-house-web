import { z } from 'zod';

export const agentInfoStepSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(1, 'Phone number is required'),
  companyName: z.string().min(1, 'Company name is required'),
  companyType: z.string().min(1, 'Company type is required'),
  companySize: z.string().min(1, 'Company size is required'),
  locationId: z.string().min(1, 'Location is required'),
});

export type AgentInfoStepData = z.infer<typeof agentInfoStepSchema>;
