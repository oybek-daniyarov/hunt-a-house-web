import { parseArgs } from 'node:util';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { nanoid } from 'nanoid';

import keywordExtractorAgent from '@/lib/ai/agents/keyword-extractor.agent';
import researchAgent from '@/lib/ai/agents/research.agent';
import { LocationSearchResponseSchema } from '@/lib/ai/types';
import { WorkflowStep } from '../types';
import { WorkflowEngine } from '../workflow-engine';

interface AIPropertyWorkflowData {
  query: string;
  keywords?: string[];
  configuration?: Record<string, unknown>;
  researchResult?: {
    text: string;
    usage: {
      totalTokens: number;
      promptTokens: number;
      completionTokens: number;
    };
  };
  finalListing?: unknown;
  usage?: {
    totalTokens: number;
    promptTokens: number;
    completionTokens: number;
  };
}

// Step 1: Extract Keywords
const extractKeywordsStep: WorkflowStep = {
  id: nanoid(),
  name: 'Extract Keywords',
  execute: async (input: unknown) => {
    if (typeof input !== 'object' || !input || !('query' in input)) {
      throw new Error('Invalid input: query is required');
    }

    const query = (input as { query: string }).query;
    const result = await keywordExtractorAgent(query);

    return {
      ...input,
      keywords: result.keywords,
      configuration: result.configuration,
      usage: result.usage,
    };
  },
};

// Step 2: Research Property
const researchPropertyStep: WorkflowStep = {
  id: nanoid(),
  name: 'Research Property',
  execute: async (input: unknown) => {
    const data = input as AIPropertyWorkflowData;
    if (!data.keywords || !data.configuration) {
      throw new Error('Keywords and configuration are required');
    }

    const result = await researchAgent({
      params: {
        configuration: data.configuration,
        keywords: data.keywords,
      },
    });

    return {
      ...data,
      researchResult: result,
      usage: {
        totalTokens: (data.usage?.totalTokens ?? 0) + result.usage.totalTokens,
        promptTokens:
          (data.usage?.promptTokens ?? 0) + result.usage.promptTokens,
        completionTokens:
          (data.usage?.completionTokens ?? 0) + result.usage.completionTokens,
      },
    };
  },
};

// Step 3: Generate Listing
const generateListingStep: WorkflowStep = {
  id: nanoid(),
  name: 'Generate Listing',
  execute: async (input: unknown) => {
    const data = input as AIPropertyWorkflowData;
    if (!data.researchResult) {
      throw new Error('Research result is required');
    }

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
      prompt: data.researchResult.text,
    });

    return {
      ...data,
      finalListing: object,
      usage: {
        totalTokens: data.usage!.totalTokens + objectUsage.totalTokens,
        promptTokens: data.usage!.promptTokens + objectUsage.promptTokens,
        completionTokens:
          data.usage!.completionTokens + objectUsage.completionTokens,
      },
    };
  },
};

async function runAIPropertyWorkflow(query: string) {
  console.log('Starting AI Property Workflow...');
  const startTime = Date.now();

  const engine = new WorkflowEngine();

  // Create workflow with steps
  const workflow = engine.createWorkflow('AI Property Processing', [
    extractKeywordsStep,
    researchPropertyStep,
    generateListingStep,
  ]);

  // Subscribe to workflow events
  engine.subscribe(workflow.id, {
    onStepComplete: (stepId, result) => {
      console.log(`Step ${stepId} completed`);
      if (result && typeof result === 'object' && 'usage' in result) {
        console.log('Current usage:', (result as any).usage);
      }
    },
    onWorkflowComplete: (context) => {
      const timeInSeconds = (Date.now() - startTime) / 1000;
      console.log(`Workflow completed in ${timeInSeconds} seconds`);
      console.log('Final result:', context.data);
    },
    onError: (error) => {
      console.error('Workflow error:', error);
    },
  });

  try {
    // Execute workflow with initial query
    const result = await engine.executeWorkflow(workflow.id, { query });
    return result;
  } catch (error) {
    console.error('Error executing workflow:', error);
    throw error;
  }
}

// Example usage
async function main() {
  const { values } = parseArgs({
    options: {
      query: {
        type: 'string',
        short: 'q',
      },
    },
  });

  const query = values.query ?? 'i like hiking need studio for rent in dubai';
  await runAIPropertyWorkflow(query);
}

if (require.main === module) {
  main().catch(console.error);
}

export { runAIPropertyWorkflow };
export type { AIPropertyWorkflowData };
