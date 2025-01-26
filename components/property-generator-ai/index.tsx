import { AnimatePresence } from 'framer-motion';

import { ErrorMessage } from '@/components/property-generator-ai/components/error-message';
import Providers from '@/components/property-generator-ai/providers/providers';
import { StepRenderer } from './components/step-renderer';
import { StepIndicator } from './steps/step-indicator';

export function PropertyGeneratorAi() {
  return (
    <Providers>
      <div className="relative w-full">
        <StepIndicator />
        <div className="relative">
          <AnimatePresence mode="wait">
            <StepRenderer />
          </AnimatePresence>
        </div>
        <ErrorMessage />
      </div>
    </Providers>
  );
}
