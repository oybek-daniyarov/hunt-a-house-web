import { z } from "zod";

// Location related fields
const locationSchema = z.object({
  emirate: z.string().min(1).describe("The emirate of the property"),
  areas: z.array(z.string()).max(3).min(1).describe("The areas of the property"),
  communities: z.array(z.string()).max(3).min(1).describe("The communities of the property"),
});

// Property type and size
const propertyDetailsSchema = z.object({
  type: z.number().min(1),
  activity: z.number().min(1),
  size: z.object({
    min: z.number().min(200),
    max: z.number(),
  }),
});

// Property specifications
const specificationsSchema = z.object({
  bedrooms: z.number().min(0).max(6),
  bathrooms: z.number().min(1).max(6),
});

// Budget information
const budgetSchema = z.object({
  min: z.number().min(1),
  max: z.number(),
  frequency: z.enum(['one_time', 'yearly', 'monthly', 'daily']).nullable(),
});

// Content and SEO
const contentSchema = z.object({
  description: z.string().max(400).describe("should follow the activity_type and format of 'Looking for {activity_type}...'"),
  title: z.string().max(100).describe("should follow the activity_type and format of 'Looking {activity_type}...'"),
  tags: z.array(z.string()).max(3).min(1),
});

// SEO schema
const seoSchema = z.object({
  title: z.string().max(100).describe("Looking {activity_type}... should be a short title that describes the property requirements"),
  description: z.string().max(400).describe("Looking {activity_type}... should be a short description that describes the property requirements"),
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
