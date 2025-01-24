import { z } from "zod";

export const propertySchema = z.object({
  emirate_name: z.string().describe('Name of the emirate (e.g., "Dubai", "Abu Dhabi", "Sharjah")'),
  areas: z.array(z.string()).describe('Area name located in the emirate, e.g. "Dubai Hills" or "Dubai Marina"').max(3),
  communities: z.array(z.string()).describe('Community or building name, e.g. "Una Place" or "Marina Gate"').max(3).optional(),
  property_type: z.number().describe('Type of property (1: Apartment, 2: Villa, 3: Townhouse)'),
  activity_type: z.number().describe('Type of activity (1: Buy, 2: Rent Long Term, 3: Rent Short Term)'),
  bedrooms: z.string().nullable().describe('Number of bedrooms (e.g., "Studio", "1", "2", "3", "4", "5+")'),
  bathrooms: z.string().nullable().describe('Number of bathrooms'),
  min_size: z.number().nullable().describe('Minimum size of the property in sqft'),
  max_size: z.number().nullable().describe('Maximum size of the property in sqft'),
  min_budget: z.number().nullable().describe('Minimum budget for the property'),
  max_budget: z.number().nullable().describe('Maximum budget for the property'),
  budget_frequency: z.enum(["one_time", "yearly", "monthly", "daily"]).nullable().describe('Frequency of the budget (one_time for buying, yearly/monthly/daily for renting)'),
  description: z.string().max(300).describe('A concise description focusing on key requirements, location benefits, and specific needs. Should be natural and avoid repetitive information.')
}); 