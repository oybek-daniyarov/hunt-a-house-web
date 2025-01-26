import { z } from 'zod';

// Location related fields
const locationSchema = z.object({
  emirate: z
    .string()
    .min(1)
    .describe('Id, if available, or name of the emirate of the property'),
  areas: z
    .array(z.string())
    .max(3)
    .min(1)
    .describe('Id, if available, or name of the areas of the property'),
  communities: z
    .array(z.string())
    .max(3)
    .min(1)
    .describe('Id, if available, or name of the communities of the property'),
});

// Property type and size
const propertyDetailsSchema = z
  .object({
    type: z
      .string()
      .min(1, 'Type is required')
      .describe('Id of the property type'),
    activity: z
      .string()
      .min(1, 'Activity is required')
      .describe('Id of the activity type'),
    size: z.object({
      min: z
        .number()
        .min(200, 'Min size must be at least 200')
        .describe('The minimum size of the property'),
      max: z
        .number()
        .min(200, 'Max size must be at least 200')
        .describe('The maximum size of the property'),
    }),
  })
  .refine((data) => data.size.min < data.size.max, {
    message: 'Min size must be less than max size',
    path: ['size', 'min'],
  });

// Property specifications
const specificationsSchema = z.object({
  bedrooms: z
    .string()
    .min(0)
    .max(6)
    .describe(
      'Id of the number of bedrooms, 0: studio, 1: 1 bedroom, 2: 2 bedrooms, 3: 3 bedrooms, 4: 4 bedrooms, 5: 5 bedrooms, 6: 6 bedrooms'
    ),
  bathrooms: z.string().min(0).max(6).describe('Id of the number of bathrooms'),
});

// Budget information
const budgetSchema = z.object({
  min: z.number().min(100, 'Min budget must be at least 100'),
  max: z.number().min(100, 'Max budget must be at least 100'),
  frequency: z.enum(['one_time', 'yearly', 'monthly', 'daily']).nullable(),
});

// Content and SEO
const contentSchema = z.object({
  description: z
    .string()
    .max(400)
    .describe(
      "should follow the activity_type and format of 'Looking for {activity_type}...'"
    ),
  title: z
    .string()
    .max(100)
    .describe(
      "should follow the activity_type and format of 'Looking {activity_type}...'"
    ),
  tags: z.array(z.string()).max(3).min(1),
});

// SEO schema
const seoSchema = z.object({
  title: z
    .string()
    .max(100)
    .describe(
      'Looking {activity_type}... should be a short title that describes the property requirements'
    ),
  description: z
    .string()
    .max(400)
    .describe(
      'Looking {activity_type}... should be a short description that describes the property requirements'
    ),
});

// Main property schema combining all sub-schemas
export const propertySchema = z.object({
  location: locationSchema,
  property: propertyDetailsSchema,
  specifications: specificationsSchema,
  budget: budgetSchema,
  content: contentSchema,
  seo: seoSchema,
});

// Export sub-schemas for reuse
export type LocationFields = z.infer<typeof locationSchema>;
export type PropertyDetailsFields = z.infer<typeof propertyDetailsSchema>;
export type SpecificationsFields = z.infer<typeof specificationsSchema>;
export type BudgetFields = z.infer<typeof budgetSchema>;
export type ContentFields = z.infer<typeof contentSchema>;
export type SeoFields = z.infer<typeof seoSchema>;

// Main type
export type PropertyResponse = z.infer<typeof propertySchema>;
