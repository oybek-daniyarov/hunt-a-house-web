import keywordExtractorAgent from '@/lib/ai/agents/keyword-extractor/keyword-extractor.agent';
import { createStep, createStepResult } from '@/lib/workflow/workflow-engine';
import {
  KeywordExtractionMetadata,
  KeywordExtractionResult,
  PropertyWorkflowData,
} from '../types';

export const extractKeywordsStep = createStep<
  PropertyWorkflowData,
  KeywordExtractionResult,
  KeywordExtractionMetadata
>({
  id: 'extract-keywords',
  name: 'Extract Keywords',
  description: 'Extract keywords from user query',
  shouldLog: false,
  execute: async (input, log) => {
    const startTime = Date.now();
    const { query } = input;

    const { keywords, configuration, usage } =
      await keywordExtractorAgent(query);

    log.data('Extracted Keywords', keywords);
    log.data('Search Configuration', configuration);

    return createStepResult(
      {
        keywords,
        searchConfig: configuration,
      },
      usage,
      {
        query,
        processingTime: Date.now() - startTime,
      }
    );
  },
  validate: async (input) => {
    return !!input.query;
  },
  retryConfig: {
    maxAttempts: 2,
    backoffMs: 2000,
    maxBackoffMs: 8000,
  },
});
