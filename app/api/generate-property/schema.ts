import { z } from "zod";

export const propertySchema = z.object({
  emirate_name: z.string().min(1),
  areas: z.array(z.string()).max(3).min(1),
  communities: z.array(z.string()).max(3).min(1),
  property_type: z.number().min(1),
  activity_type: z.number().min(1),
  min_size: z.number().min(200),
  max_size: z.number().min(200),
  bedrooms: z.number().min(1).max(6),
  bathrooms: z.number().min(1).max(6),
  min_budget: z.number().min(20000),
  max_budget: z.number().min(40000),
  budget_frequency: z.enum(['one_time', 'yearly', 'monthly', 'daily']).nullable(),
  description: z.string().max(400).describe("should follow the activity_type and format of 'Looking for  {activity_type}..."),
  title: z.string().max(100).describe("should follow the activity_type and format of 'Looking {activity_type}..."),
  tags: z.array(z.string()).max(3).min(1),
  seo: z.object({
    title: z.string().max(100).describe("Looking {activity_type}... should be a short title that describes the property requirements"),
    description: z.string().max(400).describe("Looking {activity_type}... should be a short description that describes the property requirements"),
  }),
});

export type PropertyResponse = z.infer<typeof propertySchema>;
