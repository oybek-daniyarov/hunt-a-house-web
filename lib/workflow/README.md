# TypeScript Workflow System

A production-ready, type-safe workflow engine for handling complex multi-step processes with comprehensive error handling, metrics, and event management.

## Core Features

- 🔒 Advanced Type Safety

  - Generic type parameters for steps, results, and metadata
  - Runtime validation with Zod schemas
  - Type-safe event subscribers
  - Proper error typing

- 🔄 Robust Error Handling

  - Configurable retry mechanism with exponential backoff
  - Step-level and workflow-level error boundaries
  - Detailed error reporting and logging
  - Resource cleanup on failure

- 📊 Comprehensive Metrics

  - Token usage tracking
  - Step completion statistics
  - Duration measurements
  - Performance monitoring

- 📡 Enhanced Event System
  - Lifecycle events (start, complete, error)
  - Async event handling
  - Error boundaries for subscribers
  - Type-safe event payloads

## Usage

### 1. Define Step Types

```typescript
interface StepResult<TData, TExtra extends Record<string, unknown>> {
  data: TData;
  usage: Usage;
  metadata?: TExtra;
}

interface WorkflowStep<
  TInput,
  TOutput,
  TExtra extends Record<string, unknown>,
> {
  id: string;
  name: string;
  description?: string;
  execute: (input: TInput) => Promise<StepResult<TOutput, TExtra>>;
  validate?: (input: TInput) => Promise<boolean>;
  cleanup?: () => Promise<void>;
}
```

### 2. Create Type-Safe Steps

```typescript
const myStep = createStep<InputType, OutputType, MetadataType>({
  id: 'step-id',
  name: 'Step Name',
  description: 'Optional description',
  execute: async (input, log) => {
    // Process input
    return createStepResult(output, usage, metadata);
  },
  validate: async (input) => {
    // Validate input
    return true;
  },
  cleanup: async () => {
    // Cleanup resources
  },
  retryConfig: {
    maxAttempts: 3,
    backoffMs: 1000,
    maxBackoffMs: 10000,
  },
});
```

### 3. Create and Configure Workflow

```typescript
const engine = new WorkflowEngine<WorkflowDataType>();

const workflow = engine.createWorkflowWithDefaults(
  'My Workflow',
  [step1, step2, step3],
  {
    description: 'Workflow description',
    version: '1.0.0',
    retryConfig: {
      maxAttempts: 3,
      backoffMs: 1000,
      maxBackoffMs: 10000,
    },
    onStepStart: async (stepId, input) => {
      console.log(`Starting step ${stepId}`);
    },
    onStepComplete: async (stepId, result) => {
      console.log(`Step ${stepId} completed`);
    },
    onStepError: async (stepId, error) => {
      console.error(`Step ${stepId} failed:`, error);
    },
    onComplete: async (context) => {
      console.log('Workflow completed:', context.metrics);
    },
    onError: async (error) => {
      console.error('Workflow failed:', error);
    },
  }
);
```

### 4. Execute Workflow

```typescript
try {
  const result = await engine.executeWorkflow(workflow.id, initialData);
  console.log('Workflow metrics:', result.metrics);
} catch (error) {
  console.error('Workflow failed:', error);
}
```

## Best Practices

### 1. Type Safety

- Define explicit interfaces for all data types
- Use type parameters consistently
- Validate data at runtime with Zod schemas
- Leverage TypeScript's strict mode

### 2. Error Handling

- Configure appropriate retry strategies
- Implement cleanup functions
- Use structured error logging
- Handle all async operations properly

### 3. Performance

- Monitor token usage
- Track step durations
- Implement cleanup for resources
- Use appropriate retry strategies

### 4. Monitoring

- Subscribe to relevant events
- Track metrics
- Implement proper logging
- Monitor resource usage

### 5. Resource Management

- Implement cleanup functions
- Handle timeouts properly
- Manage external resources
- Clean up on workflow completion

## Advanced Features

### 1. Step Combination

```typescript
const combinedStep = engine.combineSteps([step1, step2, step3]);
```

### 2. Metadata Tracking

```typescript
interface StepMetadata extends Record<string, unknown> {
  processingTime: number;
  attempt: number;
  customData: unknown;
}
```

### 3. Workflow Validation

```typescript
const workflowSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  steps: z.array(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
    })
  ),
});
```

### 4. Metrics Collection

```typescript
interface WorkflowMetrics {
  startedAt: Date;
  completedAt?: Date;
  duration?: number;
  totalTokens: number;
  totalSteps: number;
  completedSteps: number;
  failedSteps: number;
}
```

## Contributing

1. Follow TypeScript best practices
2. Maintain type safety
3. Add comprehensive tests
4. Document changes
5. Update examples

## License

MIT License
