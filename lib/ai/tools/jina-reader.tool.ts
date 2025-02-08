import { google } from '@ai-sdk/google';
import { generateText, tool } from 'ai';
import { z } from 'zod';

import { KeywordExtractorSchema } from '../agents/keyword-extractor/schema';

const CONTENT_CHARACTER_LIMIT = 10000;

const JinaReaderToolSchema = z
  .object({
    url: z.string().describe('The URL to extract content from'),
  })
  .merge(KeywordExtractorSchema);

type JinaReaderToolType = z.infer<typeof JinaReaderToolSchema>;

const jinaReaderTool = tool({
  description:
    'Retrieve and analyze detailed content from web pages using Jina Reader API',
  parameters: JinaReaderToolSchema,
  execute: async (params: JinaReaderToolType) => {
    if (!params.url.includes('bayut.com')) {
      return null;
    }

    try {
      const response = await fetch(`https://r.jina.ai/${params.url}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'X-Retain-Images': 'none',
          'X-Return-Format': 'markdown',
          'X-Engine': 'direct',
        },
        cache: 'force-cache',
        next: {
          tags: ['jina-reader', params.url],
        },
      });
      const json = await response.json();
      if (!json.data || json.data.length === 0) {
        return null;
      }

      return json.data.content;

      const content =
        json.data.content?.slice(0, CONTENT_CHARACTER_LIMIT) || '';

      const results = await generateText({
        model: google('gemini-2.0-flash-lite-preview-02-05'),
        prompt: `Analyze the property listing content and provide Two best matching options based on the criteria below of location, price, and features.

Content: ${content}

Search Requirements:
- Property: ${params.propertyType} | ${params.bedroomSize}
- Duration: ${params.duration}
- Budget: ${params.budget}
- Purpose: ${params.intent}
- Location: ${params.location || 'Any'}, ${params.emirate}
${params.community ? `- Community: ${params.community}` : ''}
${params.occupancyType ? `- Occupancy: ${params.occupancyType}` : ''}
${params.peopleCount ? `- Max Occupants: ${params.peopleCount}` : ''}

Provide Three best options in this format:
  - They should not be the same price, or area 

OPTION 1:
Location: [Sub Community, Community, Area, ${params.emirate}] - only include if mentioned
Price: Follow these steps:
1. Extract exact price from content if available
2. If different duration, convert to ${params.duration}:
   - Daily = Yearly ÷ 365 or Monthly ÷ 30
   - Monthly = Daily × 30 or Yearly ÷ 12
   - Yearly = Monthly × 12 or Daily × 365
3. If no price found, estimate based on:
   - Property type: ${params.propertyType}
   - Size: ${params.bedroomSize}
   - Location tier: ${params.budget}
   - Market segment: ${params.intent}
Key Features: [3 main verified features]
Amenities: [3 verified nearby amenities]
budget: (${params.budget})
Price: [min (max - 15%) - max] (${params.duration})
Short summary: [1-2 sentence summary of the property] and [1-2 based on search query]

OPTION 2:
[Same format as Option 1]

Rules:
- Only include verified information from content
- Exclude building names and numbers
- Match exact property type and size
- Clearly mark estimated prices as "(Estimated)"
- Only list amenities mentioned in content
- Skip option if no exact match found
`,
        temperature: 0.7,
      });

      return results.text;
    } catch (error) {
      console.error('Jina Reader API error:', error);
      return null;
    }
  },
});

export default jinaReaderTool;
