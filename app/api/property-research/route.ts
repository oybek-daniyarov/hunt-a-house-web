import { createDataStreamResponse, generateId } from 'ai';

import { createPropertyResearchWorkflow } from '@/lib/ai/workflow/property-research';
import { PropertyWorkflowData } from '@/lib/ai/workflow/property-research/types';
import {
  StepResult,
  WorkflowContext,
  WorkflowMetrics,
} from '@/lib/workflow/types';

export const runtime = 'edge';

// Helper to convert WorkflowMetrics to a JSON-safe object
function metricsToJSON(metrics: WorkflowMetrics) {
  return {
    startedAt: metrics.startedAt.toISOString(),
    completedAt: metrics.completedAt?.toISOString() ?? null,
    duration: metrics.duration ?? null,
    totalTokens: metrics.totalTokens,
    totalSteps: metrics.totalSteps,
    completedSteps: metrics.completedSteps,
    failedSteps: metrics.failedSteps,
  };
}

export async function POST(request: Request) {
  const body = await request.json();

  // Extract query from the last user message
  const query = body.messages?.[body.messages.length - 1]?.content;

  if (!query) {
    return new Response('Query is required', { status: 400 });
  }

  return createDataStreamResponse({
    execute: async (dataStream) => {
      try {
        const { engine, workflow } =
          await createPropertyResearchWorkflow(query);

        // Write initial status
        dataStream.writeData({ type: 'initialized', data: { query } });

        // Add streaming subscribers
        engine.subscribe(workflow.id, {
          onStepStart: async (stepId: string) => {
            dataStream.writeData({ type: 'stepStart', data: { stepId } });
          },
          onStepComplete: async (
            stepId: string,
            result: StepResult<unknown>
          ) => {
            const metadata = result.metadata as Record<string, any>;

            // Write step completion status
            dataStream.writeData({
              type: 'stepComplete',
              data: {
                stepId,
                processingTime: metadata?._internal?.processingTime ?? null,
              },
            });

            // Write step-specific data as message annotations
            const annotation = {
              id: generateId(),
              type: stepId,
              data: JSON.parse(JSON.stringify(result.data)), // Ensure JSON-serializable
              processingTime: metadata?._internal?.processingTime ?? null,
            };

            if (
              [
                'extract-keywords',
                'research-property',
                'generate-listing',
              ].includes(stepId)
            ) {
              dataStream.writeMessageAnnotation(annotation);
            }
          },
          onStepError: async (stepId: string, error: Error) => {
            dataStream.writeMessageAnnotation({
              id: generateId(),
              type: 'stepError',
              stepId,
              error: error.message,
            });
          },
          onWorkflowComplete: async (
            context: WorkflowContext<PropertyWorkflowData>
          ) => {
            const metrics = metricsToJSON(context.metrics);

            // Write final metrics
            dataStream.writeData({
              type: 'complete',
              data: {
                metrics,
                duration: metrics.duration
                  ? `${Number(metrics.duration) / 1000}s`
                  : null,
              },
            });

            // just pass the metrics
            dataStream.writeMessageAnnotation({
              id: generateId(),
              type: 'metrics',
              data: metrics,
            });
          },
          onError: async (error: Error) => {
            dataStream.writeMessageAnnotation({
              id: generateId(),
              type: 'error',
              error: error.message,
            });
          },
        });

        // Execute workflow
        await engine.executeWorkflow(workflow.id, { query });
      } catch (error) {
        // Handle any unexpected errors
        if (error instanceof Error) {
          dataStream.writeMessageAnnotation({
            id: generateId(),
            type: 'error',
            error: error.message,
          });
        }
      }
    },
    onError: (error) => {
      // Return error message to client
      return error instanceof Error ? error.message : String(error);
    },
  });
}
