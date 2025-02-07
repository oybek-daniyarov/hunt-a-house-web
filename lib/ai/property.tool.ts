import { tool } from 'ai';
import { z } from 'zod';

import { searchProperties } from '@/lib/data/laravel/property/property.api';

const searchPropertiesTool = tool({
  description: 'Search for properties based on the user query',
  parameters: z.object({
    query: z.string().describe('The user query to search for properties'),
  }),
  execute: async ({ query }) => {
    const properties = await searchProperties(query);
    return properties;
  },
});
export { searchPropertiesTool };
