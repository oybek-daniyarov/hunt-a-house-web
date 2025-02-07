import listingGeneratorAgent, {
  ListingGeneratorType,
} from '@/lib/ai/agents/listing-generator/listing-generator.agent';
import { createStep, createStepResult } from '@/lib/workflow/workflow-engine';
import { ListingGenerationMetadata, PropertyWorkflowData } from '../types';

export const generateListingStep = createStep<
  PropertyWorkflowData,
  ListingGeneratorType,
  ListingGenerationMetadata
>({
  id: 'generate-listing',
  name: 'Generate Listing',
  description: 'Generate property listing from research results',
  shouldLog: false,
  execute: async (input, log) => {
    const startTime = Date.now();
    const researchData = input['research-property'];
    if (!researchData) {
      throw new Error('Research data is required');
    }

    const extractedKeywords = input['extract-keywords'];
    if (!extractedKeywords) {
      throw new Error('Keywords are required');
    }

    const { listing, usage } = await listingGeneratorAgent({
      researchData: researchData.data,
      configuration: extractedKeywords.data.searchConfig,
      keywords: extractedKeywords.data.keywords,
    });

    log.data('Generated Listing', listing);

    return createStepResult(listing, usage, {
      researchResult: researchData.data,
      processingTime: Date.now() - startTime,
    });
  },
  validate: async (input) => {
    const researchData = input['research-property'];
    return !!researchData?.data.text;
  },
  retryConfig: {
    maxAttempts: 2,
    backoffMs: 2000,
    maxBackoffMs: 8000,
  },
});
