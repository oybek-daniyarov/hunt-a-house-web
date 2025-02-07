import { nanoid } from 'nanoid';

import { WorkflowStep } from '../types';
import { WorkflowEngine } from '../workflow-engine';

interface PropertyData {
  location: string;
  price: number;
  features: string[];
}

// Helper function to safely cast input to PropertyData
function asPropertyData(input: unknown): PropertyData {
  if (
    typeof input === 'object' &&
    input !== null &&
    'location' in input &&
    'price' in input &&
    'features' in input &&
    typeof (input as any).location === 'string' &&
    typeof (input as any).price === 'number' &&
    Array.isArray((input as any).features) &&
    (input as any).features.every(
      (f: unknown): f is string => typeof f === 'string'
    )
  ) {
    return input as PropertyData;
  }
  throw new Error('Invalid property data format');
}

// Step 1: Validate Property Data
const validatePropertyStep: WorkflowStep = {
  id: nanoid(),
  name: 'Validate Property Data',
  validate: (input: unknown) => {
    try {
      asPropertyData(input);
      return true;
    } catch {
      return false;
    }
  },
  execute: async (input: unknown) => {
    const data = asPropertyData(input);
    console.log('Validating property data:', data);
    return true;
  },
};

// Step 2: Enrich Property Data
const enrichPropertyStep: WorkflowStep = {
  id: nanoid(),
  name: 'Enrich Property Data',
  execute: async (input: unknown) => {
    const data = asPropertyData(input);
    console.log('Enriching property data with additional features');

    return {
      ...data,
      features: [...data.features, 'Newly processed', 'Verified location'],
    };
  },
};

// Step 3: Format Property Data
const formatPropertyStep: WorkflowStep = {
  id: nanoid(),
  name: 'Format Property Data',
  execute: async (input: unknown) => {
    const data = asPropertyData(input);
    console.log('Formatting property data for display');

    return {
      ...data,
      features: data.features.map((f) => f.trim().toLowerCase()),
    };
  },
};

// Example usage
async function runPropertyWorkflow() {
  const engine = new WorkflowEngine();

  // Create workflow with steps
  const workflow = engine.createWorkflow('Property Processing', [
    validatePropertyStep,
    enrichPropertyStep,
    formatPropertyStep,
  ]);

  // Subscribe to workflow events
  engine.subscribe(workflow.id, {
    onStepComplete: (stepId, result) => {
      console.log(`Step ${stepId} completed with result:`, result);
    },
    onWorkflowComplete: (context) => {
      console.log('Workflow completed:', context);
    },
    onError: (error, context) => {
      console.error('Workflow error:', error, context);
    },
  });

  // Initial property data
  const propertyData = {
    location: '123 Main St',
    price: 500000,
    features: ['3 Bedrooms', 'Garden', 'Garage'],
  };

  try {
    // Execute workflow
    const result = await engine.executeWorkflow(workflow.id, propertyData);
    console.log('Final workflow result:', result);
  } catch (error) {
    console.error('Error executing workflow:', error);
  }
}

export { runPropertyWorkflow };
export type { PropertyData };
