import { ListingGeneratorType } from '@/lib/ai/agents/listing-generator/listing-generator.agent';
import { WorkflowEngine, WorkflowLogger } from '@/lib/workflow/workflow-engine';
import { extractKeywordsStep } from './steps/extract-keywords';
import { generateListingStep } from './steps/generate-listing';
import { researchPropertyStep } from './steps/research-property';
import { ListingGenerationMetadata, PropertyWorkflowData } from './types';

export * from './steps/extract-keywords';
export * from './steps/generate-listing';
export * from './steps/research-property';
export * from './types';

export async function createPropertyResearchWorkflow(query: string) {
  const engine = new WorkflowEngine<PropertyWorkflowData>();

  const workflow = engine.createWorkflowWithDefaults(
    'Property Search',
    [extractKeywordsStep, researchPropertyStep, generateListingStep],
    {
      description:
        'Search and generate property listings from natural language queries',
      version: '1.0.0',
      retryConfig: {
        maxAttempts: 2,
        backoffMs: 1000,
        maxBackoffMs: 5000,
      },
      onStepStart: (stepId, input) => {
        WorkflowLogger.info(`Starting step ${stepId}...`);
      },
      onStepComplete: (stepId, result) => {
        if (result.metadata) {
          WorkflowLogger.info(
            `Processing time: ${(result.metadata as any).processingTime}ms`
          );
        }
      },
      onStepError: (stepId, error) => {
        WorkflowLogger.error(`Step ${stepId} failed: ${error.message}`);
      },
      onComplete: (context) => {
        WorkflowLogger.info('\nWorkflow Metrics:');
        console.log(JSON.stringify(context.metrics, null, 2));

        const finalResult = engine.getStepResult<
          ListingGeneratorType,
          ListingGenerationMetadata
        >(context, 'generate-listing');
        if (finalResult) {
          WorkflowLogger.usage(finalResult.usage);
          WorkflowLogger.info('\nFinal Listing:');
          console.log(JSON.stringify(finalResult.data, null, 2));
        }
      },
    }
  );

  // Update each step to disable built-in logging
  workflow.steps = workflow.steps.map((step) => ({
    ...step,
    shouldLog: false,
  }));

  return { engine, workflow };
}
