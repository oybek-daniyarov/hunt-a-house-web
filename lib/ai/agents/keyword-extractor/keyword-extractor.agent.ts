import { google } from '@ai-sdk/google';
import { generateObject, LanguageModelUsage } from 'ai';

import { getAgent } from '../get-agent';
import { KeywordExtractorSchema, KeywordExtractorType } from './schema';

export type KeywordExtractorResponse = {
  keywords: KeywordExtractorType;
  configuration: string;
  usage: LanguageModelUsage;
};

const keywordExtractorAgent = async (
  query: string
): Promise<KeywordExtractorResponse> => {
  // Get the agent configuration with input variable
  const agent = await getAgent('keyword-extractor-agent', {
    variables: { input: query },
  });
  if (!agent) {
    throw new Error('Keyword extractor agent not found');
  }

  const model = google(agent.configuration.model);

  const result = await generateObject({
    system: agent.systemPrompt,
    prompt: agent.prompt,
    schema: KeywordExtractorSchema,
    model,
    temperature: agent.configuration.temperature,
    maxTokens: 1000,
  });

  return {
    keywords: result.object,
    configuration: convertKeywordsToQuery(result.object),
    usage: result.usage,
  };
};

export const convertKeywordsToQuery = (keywords: KeywordExtractorType) => {
  const query = [];

  if (keywords.location) {
    query.push(`location: ${keywords.location}`);
  }

  if (keywords.emirate) {
    query.push(`emirate: ${keywords.emirate}`);
  }

  if (keywords.community && keywords.community !== 'null') {
    query.push(`community: ${keywords.community}`);
  }

  if (keywords.propertyType) {
    query.push(`propertyType: ${keywords.propertyType}`);
  }

  if (keywords.duration) {
    query.push(`duration: ${keywords.duration}`);
  }

  if (keywords.budget) {
    query.push(`budget: ${keywords.budget}`);
  }

  if (keywords.amount && keywords.amount !== 'null') {
    query.push(`amount: ${keywords.amount}`);
  }

  if (keywords.peopleCount) {
    query.push(`peopleCount: ${keywords.peopleCount}`);
  }

  if (keywords.bedroomSize) {
    query.push(`bedroomSize: ${keywords.bedroomSize}`);
  }

  if (keywords.intent) {
    query.push(keywords.intent);
  }

  if (keywords.durationInWords) {
    query.push(`durationInWords: ${keywords.durationInWords}`);
  }

  if (keywords.occupancyType) {
    query.push(`occupancyType: ${keywords.occupancyType}`);
  }

  return query.join(' ');
};

export default keywordExtractorAgent;
export { KeywordExtractorSchema };
export type { KeywordExtractorType };
