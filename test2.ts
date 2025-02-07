import { parseArgs } from 'node:util';

import { ListingGeneratorType } from '@/lib/ai/agents/listing-generator.agent';
import { createPropertyResearchWorkflow } from '@/lib/ai/workflow/property-research';
import { WorkflowLogger } from '@/lib/workflow/workflow-engine';

async function main() {
  const globalStartTime = Date.now();
  WorkflowLogger.info('Starting property search workflow...');

  const { values } = parseArgs({
    options: {
      query: {
        type: 'string',
        short: 'q',
      },
    },
  });

  const query = values.query ?? 'i like hiking need studio for rent in dubai';
  WorkflowLogger.info(`Query: "${query}"`);

  try {
    const { engine, workflow } = await createPropertyResearchWorkflow(query);
    const result = await engine.executeWorkflow(workflow.id, { query });

    // Get the final listing from the workflow result
    const finalListing = result.data['generate-listing']
      ?.data as ListingGeneratorType;

    if (finalListing) {
      return {
        success: true,
        data: finalListing,
        metrics: result.metrics,
        duration: result.metrics.duration
          ? `${result.metrics.duration / 1000}s`
          : undefined,
      };
    } else {
      return {
        success: false,
        error: 'No listing was generated',
        metrics: result.metrics,
      };
    }
  } catch (error) {
    WorkflowLogger.error(
      `Failed to execute workflow: ${(error as Error).message}`
    );
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}

if (require.main === module) {
  main()
    .then((result) => {
      if (result.success) {
        console.log('\nFinal Result:');
        console.log(JSON.stringify(result.data, null, 2));
        console.log('\nMetrics:');
        console.log(
          JSON.stringify(
            {
              duration: result.duration,
              ...result.metrics,
            },
            null,
            2
          )
        );
      } else {
        console.error('Error:', result.error);
        process.exit(1);
      }
    })
    .catch((error) => {
      WorkflowLogger.error(`Unhandled error: ${error.message}`);
      process.exit(1);
    });
}
