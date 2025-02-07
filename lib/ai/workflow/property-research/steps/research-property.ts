import researchAgent from '@/lib/ai/agents/research/research.agent';
import { createStep, createStepResult } from '@/lib/workflow/workflow-engine';
import {
  PropertyWorkflowData,
  ResearchMetadata,
  ResearchResult,
} from '../types';

export const researchPropertyStep = createStep<
  PropertyWorkflowData,
  ResearchResult,
  ResearchMetadata
>({
  id: 'research-property',
  name: 'Research Property',
  description: 'Research property based on extracted keywords',
  shouldLog: false,
  execute: async (input, log) => {
    const startTime = Date.now();
    const extractedKeywords = input['extract-keywords'];
    if (!extractedKeywords) {
      throw new Error('Keywords are required');
    }

    const result = await researchAgent({
      params: {
        configuration: extractedKeywords.data.searchConfig,
        keywords: extractedKeywords.data.keywords,
      },
    });

    log.data('Research Result', result.text);

    return createStepResult(
      {
        text: result.text,
      },
      result.usage,
      {
        extractedKeywords: extractedKeywords.data,
        processingTime: Date.now() - startTime,
      }
    );
  },
  validate: async (input) => {
    const extractedKeywords = input['extract-keywords'];
    return !!(
      extractedKeywords?.data.keywords && extractedKeywords?.data.searchConfig
    );
  },
  retryConfig: {
    maxAttempts: 2,
    backoffMs: 2000,
    maxBackoffMs: 8000,
  },
});
