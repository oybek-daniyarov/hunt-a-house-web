import { google } from '@ai-sdk/google';
import { generateObject, LanguageModelUsage } from 'ai';

import { getAgent } from '@/lib/ai/agents/get-agent';
import { KeywordExtractorType } from '@/lib/ai/agents/keyword-extractor/schema';
import { MODEL_NAME } from '@/lib/ai/constantas';
import { ListingGeneratorSchema, ListingGeneratorType } from './schema';

export type ListingGeneratorResponse = {
  listing: ListingGeneratorType;
  usage: LanguageModelUsage;
};

export type ListingGeneratorInput = {
  researchData: {
    text: string;
  };
  configuration: string;
  keywords: KeywordExtractorType;
};

const listingGeneratorAgent = async ({
  researchData,
  configuration,
}: ListingGeneratorInput): Promise<ListingGeneratorResponse> => {
  const agent = await getAgent('listing-creator-agent', {
    variables: {
      input: researchData.text,
      configuration: configuration,
    },
  });

  if (!agent) {
    throw new Error('Listing generator agent not found');
  }

  const model = google(MODEL_NAME);

  try {
    const result = await generateObject({
      model,
      system: agent.systemPrompt,
      prompt: agent.prompt,
      schema: ListingGeneratorSchema,
      temperature: agent.configuration.temperature,
    });

    if (!result || !result.object) {
      throw new Error('Listing generator returned empty results');
    }

    return {
      listing: result.object,
      usage: result.usage,
    };
  } catch (error) {
    console.error('Listing generator error:', error);
    throw new Error('Failed to generate property listing');
  }
};

export default listingGeneratorAgent;
export { ListingGeneratorSchema };
export type { ListingGeneratorType };
