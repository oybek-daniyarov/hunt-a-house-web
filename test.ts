// example.ts

import { parseArgs } from 'node:util';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';

import keywordExtractorAgent from '@/lib/ai/agents/keyword-extractor/keyword-extractor.agent';
import researchAgent from '@/lib/ai/agents/research/research.agent';
import { LocationSearchResponseSchema } from '@/lib/ai/types';

const timeToHuman = (time: number) => {
  // in seconds and milliseconds
  return `${time / 1000} seconds and ${time % 1000} milliseconds`;
};

async function main() {
  const startTime = Date.now();

  const { values } = parseArgs({
    options: {
      query: {
        type: 'string',
        short: 'q',
      },
    },
  });

  const messages = [
    {
      role: 'user' as const,
      content: values.query ?? 'i like hiking need studio for rent in dubai',
    },
  ];

  const { keywords, configuration, usage } = await keywordExtractorAgent(
    messages[0].content
  );

  console.log('keywords', keywords);

  console.log('configuration', configuration);

  console.log('took', timeToHuman(Date.now() - startTime));

  // Get a language model
  const researchResult = await researchAgent({
    params: {
      configuration,
      keywords,
    },
  });

  console.log('researcher usage', researchResult.usage);
  console.log('researcher text', researchResult.text);

  const { object, usage: objectUsage } = await generateObject({
    model: google('gemini-2.0-flash-exp'),
    system: `
    Create user listing ad based on the research result directed to property agents 
    - include intent, location, property type, amount, duration, nearby preferences
    Example:
    Looking for a 2 bedroom apartment in Dubai Marina for a short term stay etc.
    Travelling to Dubai for a short term stay, looking for a 2 bedroom apartment in Dubai Marina. budget 1000 AED per night.
    maximum 100 words
    `,
    schema: LocationSearchResponseSchema,
    prompt: `
    ${researchResult.text}
    `,
  });

  const totalUsage = {
    totalTokens:
      researchResult.usage.totalTokens +
      objectUsage.totalTokens +
      usage.totalTokens,
    promptTokens:
      researchResult.usage.promptTokens +
      objectUsage.promptTokens +
      usage.promptTokens,
    completionTokens:
      researchResult.usage.completionTokens + objectUsage.completionTokens,
  };

  console.log('object', JSON.stringify(object, null, 2));
  console.log('Total usage:', totalUsage);
  console.log('Final time:', timeToHuman(Date.now() - startTime));
}

main().catch(console.error);
