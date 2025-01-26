import * as motion from 'motion/react-client';

import { ReviewStepHeader } from '@/components/property-generator-ai/steps/review-step-header';
import StepActions from '@/components/property-generator-ai/steps/step-actions';
import { BudgetSection } from '../sections/budget-section';
import { LocationSection } from '../sections/location-section';
import { PropertySection } from '../sections/property-section';
import { SpecificationsSection } from '../sections/specifications-section';
import { SummarySection } from '../sections/summary-section';

export function ReviewStep() {
  return (
    <div className="space-y-8">
      <StepActions />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-background border border-border/50 p-8 rounded-xl shadow-sm mx-auto"
      >
        <div className="space-y-6">
          <ReviewStepHeader />

          <div className="grid grid-cols-2 gap-6">
            <LocationSection />
            <PropertySection />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <SpecificationsSection />
            <BudgetSection />
          </div>

          <SummarySection />
        </div>
      </motion.div>
    </div>
  );
}
