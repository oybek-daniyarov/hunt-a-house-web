import { z } from 'zod';

// 📍 Location related fields
const locationSchema = z.object({
  emirate: z
    .string()
    .min(1)
    .describe(
      'The name or ID of the emirate where the property is located (e.g., Dubai, Abu Dhabi).'
    ),
  areas: z
    .array(z.string())
    .max(3)
    .min(1)
    .describe(
      'A list of 1 to 3 areas where the property is located. This helps target the search results based on proximity.'
    ),
  communities: z
    .array(z.string())
    .max(3)
    .min(1)
    .describe(
      'A list of 1 to 3 specific communities or sub-areas in the property’s location, aiding precise location targeting for leads.'
    ),
});

// 🏡 Property type and size
const propertyDetailsSchema = z
  .object({
    type: z
      .string()
      .min(1, 'Type is required')
      .describe(
        'The property type ID, which identifies whether it’s an apartment, villa, townhouse, etc. This helps categorize properties for better lead targeting.'
      ),
    activity: z
      .string()
      .min(1, 'Activity is required')
      .describe(
        'The activity ID that defines the property’s use, such as rent, buy, or lease, crucial for agent-led searches and recommendations.'
      ),
    size: z.object({
      min: z
        .number()
        .min(200, 'Min size must be at least 200')
        .describe(
          'The minimum square footage of the property. Helps in targeting appropriate leads based on space requirements.'
        ),
      max: z
        .number()
        .min(200, 'Max size must be at least 200')
        .describe(
          'The maximum square footage of the property. Ensures properties match client needs in terms of size.'
        ),
    }),
    properties: z
      .array(
        z.object({
          locationId: z
            .string()
            .min(1)
            .describe(
              'The unique identifier for the property’s location, to relate properties to specific geographic areas.'
            ),
          propertyId: z
            .string()
            .min(1)
            .describe(
              'The unique identifier for the property, used to track and link specific listings.'
            ),
          links: z
            .array(z.string())
            .min(1)
            .describe(
              'A list of URLs where detailed property information can be found.'
            ),
          content: z
            .array(z.string())
            .min(1)
            .describe(
              'A list of textual content describing the property. This could include features, specifications, or marketing points useful for agents.'
            ),
          title: z
            .array(z.string())
            .min(1)
            .describe(
              'The title or headline of the property listing. Typically used for marketing and lead generation purposes.'
            ),
          path: z
            .array(z.string())
            .min(1)
            .describe(
              'A list of URL paths used to access the property details, supporting smooth navigation to the listing.'
            ),
        })
      )
      .describe(
        'Information about the properties returned based on search criteria for the agent to review and qualify leads.'
      ),
  })
  .refine((data) => data.size.min < data.size.max, {
    message: 'Min size must be less than max size',
    path: ['size', 'min'],
  });

// 🏠 Property specifications (bedrooms, bathrooms)
const specificationsSchema = z.object({
  bedrooms: z
    .string()
    .min(0)
    .max(6)
    .describe(
      'The number of bedrooms in the property. 0: studio, 1: 1 bedroom, 2: 2 bedrooms, up to 6 or more bedrooms. Used to qualify properties based on family or group needs.'
    ),
  bathrooms: z
    .string()
    .min(0)
    .max(6)
    .describe(
      'The number of bathrooms in the property. Can be used to filter properties based on lead preferences (e.g., larger families need more bathrooms).'
    ),
});

// 💰 Budget information
const budgetSchema = z.object({
  min: z
    .number()
    .min(100, 'Min budget must be at least 100')
    .describe(
      'The minimum budget for the property, used to filter properties according to the lead’s financial range.'
    ),
  max: z
    .number()
    .min(100, 'Max budget must be at least 100')
    .describe(
      'The maximum budget for the property, helping agents target properties within a client’s price range.'
    ),
  frequency: z
    .enum(['one_time', 'yearly', 'monthly', 'daily'])
    .nullable()
    .describe(
      'The frequency of payment for the property (e.g., one-time, yearly, monthly, or daily). Important for agents to suggest the right payment structure to leads.'
    ),
});

// 📢 Content and SEO Information
const contentSchema = z.object({
  description: z
    .string()
    .max(400)
    .describe(
      'A detailed description of the property, which should highlight key features and appeal to the target lead group. It follows the activity type and should match marketing strategies.'
    ),
  title: z
    .string()
    .max(100)
    .describe(
      'The property’s headline title used for marketing, should clearly describe the property and its intended use (e.g., “Luxury Villa for Rent in Dubai”).'
    ),
  tags: z
    .array(z.string())
    .max(3)
    .min(1)
    .describe(
      'A list of tags related to the property (e.g., ["luxury", "family-friendly", "pet-friendly"]) to optimize the search and enhance lead targeting.'
    ),
});

// 🔍 SEO metadata for property listings
const seoSchema = z.object({
  title: z
    .string()
    .max(100)
    .describe(
      'A short, SEO-friendly title summarizing the property’s key features, helping to drive organic search traffic to the listing.'
    ),
  description: z
    .string()
    .max(400)
    .describe(
      'A concise SEO description summarizing the key features of the property to attract the right audience in search engines.'
    ),
});

// 🏡 Main property schema combining all sub-schemas
export const propertySchema = z.object({
  location: locationSchema,
  property: propertyDetailsSchema,
  specifications: specificationsSchema,
  budget: budgetSchema,
  content: contentSchema,
  seo: seoSchema,
});

// 📌 Export sub-schemas for reuse in other parts of the system
export type LocationFields = z.infer<typeof locationSchema>;
export type PropertyDetailsFields = z.infer<typeof propertyDetailsSchema>;
export type SpecificationsFields = z.infer<typeof specificationsSchema>;
export type BudgetFields = z.infer<typeof budgetSchema>;
export type ContentFields = z.infer<typeof contentSchema>;
export type SeoFields = z.infer<typeof seoSchema>;

// 📌 Main response type
export type PropertyResponse = z.infer<typeof propertySchema>;
