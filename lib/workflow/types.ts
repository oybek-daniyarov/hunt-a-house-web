import { z } from 'zod';

// Base types for common structures
export interface Usage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

// Generic type for step results with type safety
export interface StepResult<
  TData = unknown,
  TExtra extends Record<string, unknown> = Record<string, unknown>,
> {
  data: TData;
  usage: Usage;
  metadata?: TExtra;
}

// Type-safe workflow step interface
export interface WorkflowStep<
  TInput,
  TOutput,
  TExtra extends Record<string, unknown> = Record<string, unknown>,
> {
  id: string;
  name: string;
  description?: string;
  execute: (input: TInput) => Promise<StepResult<TOutput, TExtra>>;
  validate?: (input: TInput) => Promise<boolean>;
  cleanup?: () => Promise<void>;
}

export interface WorkflowMetrics {
  startedAt: Date;
  completedAt?: Date;
  duration?: number;
  totalTokens: number;
  totalSteps: number;
  completedSteps: number;
  failedSteps: number;
}

export interface WorkflowContext<TData> {
  id: string;
  name: string;
  startedAt: Date;
  completedAt?: Date;
  currentStepId?: string;
  data: Record<string, StepResult<unknown>>;
  error?: Error;
  metrics: WorkflowMetrics;
}

export interface WorkflowSubscriber<TData> {
  onStepStart?: (stepId: string, input: TData) => void | Promise<void>;
  onStepComplete?: (
    stepId: string,
    result: StepResult<unknown>
  ) => void | Promise<void>;
  onStepError?: (stepId: string, error: Error) => void | Promise<void>;
  onWorkflowComplete?: (
    context: WorkflowContext<TData>
  ) => void | Promise<void>;
  onError?: (
    error: Error,
    context: WorkflowContext<TData>
  ) => void | Promise<void>;
}

export interface Workflow<TData> {
  id: string;
  name: string;
  description?: string;
  version?: string;
  steps: Array<WorkflowStep<TData, unknown>>;
  context: WorkflowContext<TData>;
  subscribers: Set<WorkflowSubscriber<TData>>;
  isRunning: boolean;
  retryConfig?: {
    maxAttempts: number;
    backoffMs: number;
    maxBackoffMs: number;
  };
}

// Validation schemas
export const usageSchema = z.object({
  promptTokens: z.number().min(0),
  completionTokens: z.number().min(0),
  totalTokens: z.number().min(0),
});

export const stepResultSchema = z.object({
  data: z.unknown(),
  usage: usageSchema,
  metadata: z.record(z.unknown()).optional(),
});

export const workflowSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  version: z.string().optional(),
  steps: z.array(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      description: z.string().optional(),
    })
  ),
  retryConfig: z
    .object({
      maxAttempts: z.number().min(1),
      backoffMs: z.number().min(0),
      maxBackoffMs: z.number().min(0),
    })
    .optional(),
});

// Property workflow specific types
export interface KeywordExtractionResult {
  keywords: {
    location?: string;
    emirate:
      | 'Dubai'
      | 'Abu Dhabi'
      | 'Sharjah'
      | 'Ajman'
      | 'Ras Al Khaimah'
      | 'Fujairah'
      | 'Umm Al Quwain';
    propertyType:
      | 'apartment'
      | 'villa'
      | 'studio'
      | 'penthouse'
      | 'townhouse'
      | 'loft'
      | 'duplex'
      | 'hotel apartment'
      | 'serviced apartment'
      | 'commercial villa'
      | 'residential building'
      | 'hotel';
    duration: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
    budget:
      | 'budget-friendly'
      | 'affordable'
      | 'moderate'
      | 'mid-range'
      | 'premium'
      | 'luxury'
      | 'ultra-luxury'
      | 'exclusive';
    peopleCount: number;
    bedroomSize:
      | 'studio'
      | '1BR'
      | '2BR'
      | '3BR'
      | '4BR'
      | '5BR'
      | '6BR+'
      | '7BR+'
      | '8BR+';
    intent:
      | 'holiday'
      | 'business'
      | 'shopping'
      | 'travel'
      | 'business travel'
      | 'relocation'
      | 'short-term'
      | 'long-term'
      | 'family living'
      | 'student accommodation'
      | 'corporate housing'
      | 'remote working'
      | 'vacation home';
    searchQuery?: string;
    originalQuery?: string;
    occupancyType?: 'single' | 'family' | 'sharing' | 'corporate' | 'student';
  };
  searchConfig: string;
}

export interface ResearchResult {
  text: string;
}

export interface PropertyListing {
  title: string;
  description: string;
  location: string;
  propertyType: string;
  price: string;
  duration: string;
  amenities?: string[];
}

// Step-specific metadata types
export interface KeywordExtractionMetadata extends Record<string, unknown> {
  query: string;
  processingTime: number;
}

export interface ResearchMetadata extends Record<string, unknown> {
  extractedKeywords: KeywordExtractionResult;
  processingTime: number;
}

export interface ListingGenerationMetadata extends Record<string, unknown> {
  researchResult: ResearchResult;
  processingTime: number;
}

// Workflow data type that tracks all step results with proper typing
export interface PropertyWorkflowData {
  query: string;
  'extract-keywords'?: StepResult<
    KeywordExtractionResult,
    KeywordExtractionMetadata
  >;
  'research-property'?: StepResult<ResearchResult, ResearchMetadata>;
  'generate-listing'?: StepResult<PropertyListing, ListingGenerationMetadata>;
}

export type WorkflowDefinition = z.infer<typeof workflowSchema>;
