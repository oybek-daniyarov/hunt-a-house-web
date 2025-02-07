import { z } from 'zod';

export const ResearchSchema = z.object({
  properties: z.array(
    z.object({
      title: z.string(),
      location: z.string(),
      price: z.string(),
      specifications: z.object({
        bedrooms: z.string().optional(),
        bathrooms: z.string().optional(),
        area: z.string().optional(),
        type: z.string().optional(),
      }),
      amenities: z.array(z.string()).optional(),
      description: z.string(),
      source: z.string().optional(),
    })
  ),
  marketInsights: z.object({
    priceRange: z.string(),
    trends: z.array(z.string()),
    recommendations: z.array(z.string()),
  }),
  summary: z.string(),
});

export type ResearchType = z.infer<typeof ResearchSchema>;
