import chalk from 'chalk';
import { nanoid } from 'nanoid';

import {
  StepResult,
  Usage,
  Workflow,
  WorkflowContext,
  workflowSchema,
  WorkflowStep,
  WorkflowSubscriber,
} from './types';

// Workflow logging utilities
export const WorkflowLogger = {
  step: (message: string) => console.log(chalk.blue(`\n📋 ${message}`)),
  info: (message: string) => console.log(chalk.gray(`ℹ️  ${message}`)),
  success: (message: string) => console.log(chalk.green(`✅ ${message}`)),
  error: (message: string) => console.log(chalk.red(`❌ ${message}`)),
  usage: (usage: Usage) =>
    console.log(chalk.yellow(`📊 Usage: ${JSON.stringify(usage, null, 2)}`)),
  time: (startTime: number) =>
    console.log(chalk.magenta(`⏱️  Time elapsed: ${formatTime(startTime)}`)),
  data: (label: string, data: unknown) =>
    console.log(chalk.cyan(`📄 ${label}:\n${JSON.stringify(data, null, 2)}`)),
};

// Time formatting utility
export const formatTime = (startTime: number): string => {
  const elapsed = Date.now() - startTime;
  return `${(elapsed / 1000).toFixed(2)}s`;
};

// Helper to create a step result with proper typing
export function createStepResult<TData, TExtra extends Record<string, unknown>>(
  data: TData,
  usage: Usage,
  metadata?: TExtra
): StepResult<TData, TExtra> {
  return {
    data,
    usage,
    metadata,
  };
}

// Helper to create a step with timing and logging
export function createStep<
  TInput,
  TOutput,
  TExtra extends Record<string, unknown>,
>(config: {
  id: string;
  name: string;
  description?: string;
  execute: (
    input: TInput,
    helpers: typeof WorkflowLogger
  ) => Promise<StepResult<TOutput, TExtra>>;
  validate?: (input: TInput) => Promise<boolean>;
  cleanup?: () => Promise<void>;
  shouldLog?: boolean;
  retryConfig?: {
    maxAttempts: number;
    backoffMs: number;
    maxBackoffMs: number;
  };
}): WorkflowStep<TInput, TOutput, TExtra> {
  return {
    id: config.id,
    name: config.name,
    description: config.description,
    validate: config.validate,
    cleanup: config.cleanup,
    execute: async (input: TInput) => {
      const stepStartTime = Date.now();
      if (config.shouldLog !== false) {
        WorkflowLogger.step(`Starting ${config.name}...`);
      }

      let lastError: Error | undefined;
      const maxAttempts = config.retryConfig?.maxAttempts ?? 1;
      const backoffMs = config.retryConfig?.backoffMs ?? 1000;
      const maxBackoffMs = config.retryConfig?.maxBackoffMs ?? 10000;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          const result = await config.execute(input, WorkflowLogger);

          if (config.shouldLog !== false) {
            WorkflowLogger.success(`${config.name} completed successfully`);
            WorkflowLogger.usage(result.usage);
            WorkflowLogger.time(stepStartTime);
          }

          const metadata = {
            ...(result.metadata ?? {}),
            _internal: {
              attempt,
              processingTime: Date.now() - stepStartTime,
            },
          };

          return {
            ...result,
            metadata: metadata as unknown as TExtra,
          };
        } catch (error) {
          lastError = error as Error;
          if (attempt < maxAttempts) {
            const delay = Math.min(
              backoffMs * Math.pow(2, attempt - 1),
              maxBackoffMs
            );
            if (config.shouldLog !== false) {
              WorkflowLogger.error(
                `${config.name} failed (attempt ${attempt}/${maxAttempts}): ${lastError.message}`
              );
              WorkflowLogger.info(`Retrying in ${delay}ms...`);
            }
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      }

      if (config.shouldLog !== false) {
        WorkflowLogger.error(
          `${config.name} failed after ${maxAttempts} attempts: ${lastError?.message}`
        );
      }
      throw lastError;
    },
  };
}

export class WorkflowEngine<TWorkflowData> {
  private workflows: Map<string, Workflow<TWorkflowData>> = new Map();

  // Helper to get step result with type safety
  getStepResult<TOutput, TExtra extends Record<string, unknown>>(
    context: WorkflowContext<TWorkflowData>,
    stepId: string
  ): StepResult<TOutput, TExtra> | undefined {
    const result = context.data[stepId] as
      | StepResult<TOutput, TExtra>
      | undefined;
    return result;
  }

  // Helper to combine multiple steps into a single workflow
  combineSteps(
    steps: Array<WorkflowStep<TWorkflowData, unknown>>
  ): WorkflowStep<TWorkflowData, unknown> {
    return createStep({
      id: 'combined-steps',
      name: 'Combined Steps',
      execute: async (input) => {
        let currentData = input;
        let combinedUsage: Usage = {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0,
        };

        for (const step of steps) {
          const result = await step.execute(currentData);
          combinedUsage = {
            promptTokens:
              combinedUsage.promptTokens + result.usage.promptTokens,
            completionTokens:
              combinedUsage.completionTokens + result.usage.completionTokens,
            totalTokens: combinedUsage.totalTokens + result.usage.totalTokens,
          };
          currentData = {
            ...currentData,
            [step.id]: result,
          } as TWorkflowData;
        }

        return createStepResult(currentData, combinedUsage);
      },
    });
  }

  // Helper to create a workflow with default error handling and logging
  createWorkflowWithDefaults(
    name: string,
    steps: Array<WorkflowStep<TWorkflowData, unknown>>,
    options: {
      description?: string;
      version?: string;
      retryConfig?: {
        maxAttempts: number;
        backoffMs: number;
        maxBackoffMs: number;
      };
      onStepStart?: (
        stepId: string,
        input: TWorkflowData
      ) => void | Promise<void>;
      onStepComplete?: (
        stepId: string,
        result: StepResult<unknown>
      ) => void | Promise<void>;
      onStepError?: (stepId: string, error: Error) => void | Promise<void>;
      onComplete?: (
        context: WorkflowContext<TWorkflowData>
      ) => void | Promise<void>;
      onError?: (error: Error) => void | Promise<void>;
    } = {}
  ): Workflow<TWorkflowData> {
    const workflow = this.createWorkflow(name, steps, {
      description: options.description,
      version: options.version,
      retryConfig: options.retryConfig,
    });

    this.subscribe(workflow.id, {
      onStepStart: options.onStepStart,
      onStepComplete: (stepId, result) => {
        WorkflowLogger.success(`Step ${stepId} completed`);
        options.onStepComplete?.(stepId, result);
      },
      onStepError: (stepId, error) => {
        WorkflowLogger.error(`Step ${stepId} failed: ${error.message}`);
        options.onStepError?.(stepId, error);
      },
      onWorkflowComplete: (context) => {
        WorkflowLogger.success('Workflow completed successfully');
        options.onComplete?.(context);
      },
      onError: (error, context) => {
        WorkflowLogger.error(`Workflow error: ${error.message}`);
        options.onError?.(error);
      },
    });

    return workflow;
  }

  createWorkflow(
    name: string,
    steps: Array<WorkflowStep<TWorkflowData, unknown>>,
    options: {
      description?: string;
      version?: string;
      retryConfig?: {
        maxAttempts: number;
        backoffMs: number;
        maxBackoffMs: number;
      };
    } = {}
  ): Workflow<TWorkflowData> {
    const workflow: Workflow<TWorkflowData> = {
      id: nanoid(),
      name,
      description: options.description,
      version: options.version,
      steps,
      context: {
        id: nanoid(),
        name,
        startedAt: new Date(),
        data: {},
        metrics: {
          startedAt: new Date(),
          totalTokens: 0,
          totalSteps: steps.length,
          completedSteps: 0,
          failedSteps: 0,
        },
      },
      subscribers: new Set(),
      isRunning: false,
      retryConfig: options.retryConfig,
    };

    // Validate workflow configuration
    workflowSchema.parse(workflow);
    this.workflows.set(workflow.id, workflow);
    return workflow;
  }

  subscribe(
    workflowId: string,
    subscriber: WorkflowSubscriber<TWorkflowData>
  ): () => void {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} not found`);
    }

    workflow.subscribers.add(subscriber);
    return () => workflow.subscribers.delete(subscriber);
  }

  async executeWorkflow(
    workflowId: string,
    initialData: Partial<TWorkflowData>
  ): Promise<WorkflowContext<TWorkflowData>> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} not found`);
    }

    if (workflow.isRunning) {
      throw new Error(`Workflow ${workflowId} is already running`);
    }

    workflow.isRunning = true;
    let currentData = initialData as TWorkflowData;

    try {
      for (const step of workflow.steps) {
        workflow.context.currentStepId = step.id;

        // Notify subscribers of step start
        await Promise.all(
          Array.from(workflow.subscribers).map(async (subscriber) => {
            try {
              await subscriber.onStepStart?.(step.id, currentData);
            } catch (error) {
              console.error(`Error in subscriber onStepStart:`, error);
            }
          })
        );

        try {
          if (step.validate) {
            const isValid = await step.validate(currentData);
            if (!isValid) {
              throw new Error(`Validation failed for step ${step.id}`);
            }
          }

          const result = await step.execute(currentData);
          workflow.context.data[step.id] = result;
          workflow.context.metrics.completedSteps++;
          workflow.context.metrics.totalTokens += result.usage.totalTokens;

          currentData = {
            ...currentData,
            [step.id]: result,
          } as TWorkflowData;

          // Notify subscribers of step completion
          await Promise.all(
            Array.from(workflow.subscribers).map(async (subscriber) => {
              try {
                await subscriber.onStepComplete?.(step.id, result);
              } catch (error) {
                console.error(`Error in subscriber onStepComplete:`, error);
              }
            })
          );
        } catch (error) {
          workflow.context.metrics.failedSteps++;

          // Notify subscribers of step error
          await Promise.all(
            Array.from(workflow.subscribers).map(async (subscriber) => {
              try {
                await subscriber.onStepError?.(step.id, error as Error);
              } catch (error) {
                console.error(`Error in subscriber onStepError:`, error);
              }
            })
          );

          throw error;
        }
      }

      workflow.context.completedAt = new Date();
      workflow.context.currentStepId = undefined;
      workflow.context.metrics.duration =
        workflow.context.completedAt.getTime() -
        workflow.context.startedAt.getTime();

      // Notify subscribers of workflow completion
      await Promise.all(
        Array.from(workflow.subscribers).map(async (subscriber) => {
          try {
            await subscriber.onWorkflowComplete?.(workflow.context);
          } catch (error) {
            console.error(`Error in subscriber onWorkflowComplete:`, error);
          }
        })
      );

      return workflow.context;
    } catch (error) {
      workflow.context.error = error as Error;

      // Notify subscribers of error
      await Promise.all(
        Array.from(workflow.subscribers).map(async (subscriber) => {
          try {
            await subscriber.onError?.(error as Error, workflow.context);
          } catch (error) {
            console.error(`Error in subscriber onError:`, error);
          }
        })
      );

      throw error;
    } finally {
      workflow.isRunning = false;

      // Run cleanup functions if they exist
      for (const step of workflow.steps) {
        if (step.cleanup) {
          try {
            await step.cleanup();
          } catch (error) {
            console.error(`Error in step cleanup:`, error);
          }
        }
      }
    }
  }

  getWorkflow(workflowId: string): Workflow<TWorkflowData> | undefined {
    return this.workflows.get(workflowId);
  }

  deleteWorkflow(workflowId: string): boolean {
    return this.workflows.delete(workflowId);
  }
}
