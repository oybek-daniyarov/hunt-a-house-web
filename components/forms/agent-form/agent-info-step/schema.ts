import { z } from 'zod';

export const agentInfoStepSchema = z
  .object({
    address: z.string().optional().nullable(),
    website: z.string().url('Please enter a valid URL'),
    reraNumber: z.string(),
    tradeLicense: z.string().min(1, 'Trade license is required'),
    dtcmNumber: z.string(),
    companyName: z.string().min(1, 'Company name is required'),
    companyType: z.string().min(1, 'Company type is required'),
    companySize: z.string().min(1, 'Company size is required'),
    locationId: z.string().min(1, 'Location is required'),
  })
  .refine(
    (data) => {
      if (data.companyType === 'real_estate') {
        return data.reraNumber.length > 0;
      }
      return true;
    },
    {
      message: 'RERA number is required for real estate companies',
      path: ['reraNumber'],
    }
  )
  .refine(
    (data) => {
      if (data.companyType === 'holiday_homes') {
        return data.dtcmNumber.length > 0;
      }
      return true;
    },
    {
      message: 'DTCM number is required for holiday homes companies',
      path: ['dtcmNumber'],
    }
  );

export type AgentInfoStepData = z.infer<typeof agentInfoStepSchema>;
