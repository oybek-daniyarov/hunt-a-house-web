import { CoreAssistantMessage, CoreToolMessage } from 'ai';
import { z } from 'zod';

export interface PropertySearchIntent {
  location: string;
  propertyType?: 'apartment' | 'villa' | 'studio' | 'penthouse';
  duration?: 'short-term' | 'long-term' | 'daily' | 'monthly' | 'yearly';
  budget?: {
    min?: number;
    max?: number;
    currency: 'AED';
  };
  nearbyPreferences?: string[];
}

export interface PropertySearchResponse {
  results: (CoreAssistantMessage | (CoreToolMessage & { id: string }))[];
  metadata: {
    steps: any[];
    originalQuery: string;
  };
}

export enum PriceRange {
  BudgetFriendly = 'Budget-Friendly',
  MidRange = 'Mid-Range',
  HighEnd = 'High-End',
  Luxury = 'Luxury',
  UltraLuxury = 'Ultra-Luxury',
}

export enum Target {
  Families = 'Families',
  Professionals = 'Professionals',
  Couples = 'Couples',
  Singles = 'Singles',
  Students = 'Students',
  Retirees = 'Retirees',
  Investors = 'Investors',
  Expats = 'Expats',
  Local_Emiratis = 'Local_Emiratis',
  Executives = 'Executives',
  Diplomats = 'Diplomats',
  Digital_Nomads = 'Digital_Nomads',
  Remote_Workers = 'Remote_Workers',
  Golden_Visa_Holders = 'Golden_Visa_Holders',
  Entrepreneurs = 'Entrepreneurs',
}

export enum Term {
  Daily = 'Daily',
  Monthly = 'Monthly',
  Yearly = 'Yearly',
}

export const LocationSearchResponseSchema = z.object({
  location: z
    .object({
      emirateName: z.string().describe('emirate name'),
      emirateId: z.string().describe('emirate id from the config'),
      locationName: z.string(),
      locationPath: z.string(),
    })
    .describe('Location not just emirate name'),
  price: z
    .object({
      range: z
        .nativeEnum(PriceRange)
        .describe(
          'Price category based on area and property type. BUDGET (below market average), MIDRANGE (average market rate), LUXURY (premium properties)'
        ),
      term: z
        .nativeEnum(Term)
        .describe(
          'Rental term based on user query and property type. DAILY (1-30 days), MONTHLY (1-11 months), YEARLY (12+ months)'
        ),
      max: z
        .number()
        .describe(
          'Based on location and property type, the maximum budget in AED based on the term and market average'
        ),
      min: z
        .number()
        .describe(
          'Minimum budget in AED, typically 20% below maxBudget. Based on Term. Should align with property type and area standards'
        ),
    })
    .describe('Price of the property'),
  listing: z
    .object({
      activity: z.string().describe('please provide id from the instructions'),
      type: z.string().describe('please provide id from the instructions'),
      size: z.object({
        max: z
          .number()
          .describe(
            'Size of the max property in square feet. Based on the market standard and search results, if use following values: Studio (400-600), 1BR (600-900), 2BR (1000-1400), 3BR (1500-2200). For villas: 3BR (2500-3500), 4BR (3500-5000), 5BR (5000+)'
          ),
        min: z
          .number()
          .describe('Size of the min property propertySizeMax - 15%'),
      }),
      bedrooms: z
        .string()
        .describe(
          'please provide id from the instructions, Consider occupancy: 1-2 people = 1BR, 3-4 people = 2BR, 5-6 people = 3BR, etc.'
        ),
      bathrooms: z
        .string()
        .describe(
          'please provide id from the instructions, bedrooms ratio. Studio/1BR = 1-1.5 baths, 2BR = 2 baths, 3BR = 2-3 baths, 4BR+ = 3+ baths'
        ),
    })
    .describe('Best matching property details'),
  content: z.string().describe(`
    User directed description of the location based on the original query and location include features and benefits
    example:
    Looking for a 2 bedroom apartment in Dubai Marina for a short term stay etc.
    `),
});

export type LocationSearchResponse = z.infer<
  typeof LocationSearchResponseSchema
>;
