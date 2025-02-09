import { createContext, useContext, useState } from 'react';
import { generateId, Message } from 'ai';
import { useChat } from 'ai/react';

const WORKFLOW_STEPS = [
  { id: 'extract-keywords', label: 'Extracting Keywords' },
  { id: 'research-property', label: 'Researching Property' },
  { id: 'generate-listing', label: 'Generating Listing' },
] as const;

interface StepData {
  currentStep: string;
  progress: number;
  stepLabel: string;
  stepNumber: number;
  totalSteps: number;
  processingTime?: number;
}

interface StepAnnotation {
  id: string;
  type: string;
  data: Record<string, any>;
  processingTime: number;
}

interface WorkflowMetrics {
  startedAt: string;
  completedAt: string | null;
  duration: number | null;
  totalTokens: number;
  totalSteps: number;
  completedSteps: number;
  failedSteps: number;
}

interface SearchContextType {
  state: {
    isSearching: boolean;
    isInitialized: boolean;
    step: StepData;
    metrics?: WorkflowMetrics;
  };
  messages: Message[];
  input: string;
  error?: Error;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  reload: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [chatId, setChatId] = useState<string>(generateId());

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: baseHandleSubmit,
    isLoading,
    error,
    data,
    reload,
  } = useChat({
    api: '/api/property-research',
    id: chatId,
    initialMessages: [],
    body: (message: { content: string }) => ({
      query: message.content,
    }),
  });

  const lastMessage = messages[messages.length - 1];
  const annotations = lastMessage?.annotations as StepAnnotation[] | undefined;

  // Get the latest completed step
  const completedSteps =
    annotations?.filter((annotation) =>
      WORKFLOW_STEPS.some((step) => step.id === annotation.type)
    ) ?? [];

  const currentStepIndex = completedSteps.length;
  const nextStep = WORKFLOW_STEPS[currentStepIndex];
  const isInitialized = Boolean(annotations && annotations.length > 0);

  // Get the current step's processing time
  const currentStepAnnotation = annotations?.find(
    (annotation) => annotation.type === nextStep?.id
  );

  // Get workflow metrics if complete
  const metricsAnnotation = annotations?.find(
    (annotation) => annotation.type === 'metrics'
  );

  const stepData: StepData = {
    currentStep: nextStep?.id || '',
    progress: (currentStepIndex / WORKFLOW_STEPS.length) * 100,
    stepLabel: nextStep?.label || 'Complete',
    stepNumber: currentStepIndex,
    totalSteps: WORKFLOW_STEPS.length,
    processingTime: currentStepAnnotation?.processingTime,
  };

  const state = {
    isSearching: isLoading,
    isInitialized,
    step: stepData,
    metrics: metricsAnnotation?.data as WorkflowMetrics | undefined,
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setChatId(generateId());
    baseHandleSubmit(e);
  };

  console.log(data);

  return (
    <SearchContext.Provider
      value={{
        state,
        messages,
        input,
        error,
        handleInputChange,
        handleSubmit,
        reload,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
