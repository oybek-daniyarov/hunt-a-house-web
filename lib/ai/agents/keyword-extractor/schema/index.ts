import { z } from 'zod';

export const KeywordExtractorSchema = z.object({
  location: z
    .string()
    .optional()
    .describe(
      'Specific location or area within the emirate (e.g., Dubai Marina, Palm Jumeirah, Downtown Dubai, DIFC)'
    ),
  emirate: z
    .enum([
      'Dubai',
      'Abu Dhabi',
      'Sharjah',
      'Ajman',
      'Ras Al Khaimah',
      'Fujairah',
      'Umm Al Quwain',
    ])
    .optional()
    .default('Dubai')
    .describe('Primary UAE emirate for property search'),
  community: z
    .string()
    .optional()
    .describe(
      'Master community or development name (e.g., JLT, Business Bay, Dubai Hills Estate, Arabian Ranches)'
    ),
  propertyType: z
    .enum([
      'apartment',
      'villa',
      'studio',
      'penthouse',
      'townhouse',
      'loft',
      'duplex',
      'hotel apartment',
      'serviced apartment',
      'commercial villa',
      'residential building',
      'hotel',
    ])
    .optional()
    .default('apartment')
    .describe('Specific type of property or accommodation'),
  duration: z
    .enum(['daily', 'weekly', 'monthly', 'quarterly', 'yearly'])
    .describe('Rental duration period'),
  durationInWords: z
    .enum(['short-term', 'long-term', 'flexible'])
    .optional()
    .describe('Rental duration category'),
  budget: z
    .enum([
      'budget-friendly',
      'affordable',
      'moderate',
      'mid-range',
      'premium',
      'luxury',
      'ultra-luxury',
      'exclusive',
    ])
    .default('mid-range')
    .describe(
      'Price range category based on market segments, amount, location + duration'
    ),
  amount: z.string().optional().describe('Amount if mentioned by the user'),
  peopleCount: z
    .number()
    .min(1)
    .max(20)
    .default(1)
    .describe(
      'Total number of occupants for the property, if single 1, if family 2-3, if corporate 3-5'
    ),
  bedroomSize: z
    .enum(['studio', '1BR', '2BR', '3BR', '4BR', '5BR', '6BR+', '7BR+', '8BR+'])
    .default('studio')
    .describe(
      'based on the user count Studio = 1 person, 1BR = 1/2 people, 2BR = 2/3 people, 3BR = 3/4 people, 4BR = 4/5 people etc. if villa minimum 3 bedrooms'
    ),
  intent: z
    .enum([
      'holiday',
      'business',
      'shopping',
      'travel',
      'business travel',
      'relocation',
      'short-term',
      'long-term',
      'family living',
      'student accommodation',
      'corporate housing',
      'remote working',
      'vacation home',
    ])
    .default('holiday')
    .describe('Primary purpose of the property search'),
  searchQuery: z
    .string()
    .optional()
    .describe(
      'SEO-optimized search query based on extracted keywords, Include (activity, purpose, intent, bedroomSize and propertyType, budget)'
    ),
  originalQuery: z
    .string()
    .optional()
    .describe('Original user query for reference'),
  occupancyType: z
    .enum(['single', 'family', 'sharing', 'corporate', 'student'])
    .optional()
    .describe('Intended occupancy type'),
});

export type KeywordExtractorType = z.infer<typeof KeywordExtractorSchema>;
