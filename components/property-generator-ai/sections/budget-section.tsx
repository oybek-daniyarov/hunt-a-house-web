'use client';

import { PAYMENT_FREQUENCIES_OPTIONS } from '@/components/property-generator-ai/types';
import { InputField } from '@/components/ui/input-field';
import { SelectField } from '@/components/ui/select-field';
import { EditSection } from '../components/edit-section';
import { usePropertyForm } from '../providers/property-form-provider';
import BudgetPreviewSection from './budget-preview-section';

const TITLE = 'Budget';
const EDITING_SECTION = 'budget';

export function BudgetSection() {
  const { isCurrentEditingSection, form } = usePropertyForm();
  const isEditing = isCurrentEditingSection(EDITING_SECTION);

  return (
    <EditSection title={TITLE} editingSection={EDITING_SECTION}>
      {isEditing ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              control={form.control}
              name="budget.min"
              label="Minimum Budget (AED)"
              type="number"
              placeholder="Min budget"
              parseValue={(value) => (value ? parseInt(value) : null)}
            />
            <InputField
              control={form.control}
              name="budget.max"
              label="Maximum Budget (AED)"
              type="number"
              placeholder="Max budget"
              parseValue={(value) => (value ? parseInt(value) : null)}
            />
          </div>
          <SelectField
            control={form.control}
            name="budget.frequency"
            label="Payment Frequency"
            placeholder="Select payment frequency"
            options={PAYMENT_FREQUENCIES_OPTIONS}
          />
        </>
      ) : (
        <BudgetPreviewSection />
      )}
    </EditSection>
  );
}
