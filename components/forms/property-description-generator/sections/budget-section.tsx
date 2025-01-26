'use client';

import { UseFormReturn } from "react-hook-form";
import { type PropertyResponse } from "@/app/api/generate-property/schema";
import { EditSection } from "../ui/edit-section";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { usePropertyForm } from "../property-form-provider";

function formatBudget(budget: PropertyResponse['budget'] | null) {
  if (!budget?.min && !budget?.max) return 'Not specified';
  
  const formatNumber = (num: number) => 
    new Intl.NumberFormat('en-AE', { 
      style: 'currency', 
      currency: 'AED',
      maximumFractionDigits: 0 
    }).format(num);

  const range = [budget.min && formatNumber(budget.min), budget.max && formatNumber(budget.max)]
    .filter(Boolean)
    .join(' - ');

  const period = budget.frequency === 'one_time' ? '' 
    : budget.frequency === 'yearly' ? ' per year'
    : budget.frequency === 'monthly' ? ' per month'
    : budget.frequency === 'daily' ? ' per day'
    : '';

  return `${range}${period}`;
}

interface BudgetSectionProps {
  form: UseFormReturn<PropertyResponse>;
  isEditing: boolean;
  propertyData: PropertyResponse | null;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  isGenerating: boolean;
}

const TITLE = 'Budget';

export function BudgetSection({
  form,
  isEditing,
  propertyData,
  onEdit,
  onSave,
  onCancel,
  isGenerating
}: BudgetSectionProps) {
  const { handleSubmit } = usePropertyForm();

  const handleSave = async () => {
    const isValid = await handleSubmit();
    if (isValid) {
      onSave();
    }
  };

  const renderForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="budget.min"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Budget (AED)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Min budget" 
                  {...field}
                  value={field.value?.toString() || ''}
                  onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="budget.max"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Budget (AED)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Max budget" 
                  {...field}
                  value={field.value?.toString() || ''}
                  onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="budget.frequency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Frequency</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment frequency" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="one_time">One Time</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  const renderContent = () => {
    const { getValue } = usePropertyForm();
    const budget = getValue('budget', {
      min: 0,
      max: 0,
      frequency: null
    });

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">Budget:</span>
          <span>{formatBudget(budget)}</span>
        </div>
      </div>
    );
  };

  return (
    <EditSection
      title={TITLE}
      isEditing={isEditing}
      isDisabled={isGenerating}
      onEdit={onEdit}
      onSave={handleSave}
      onCancel={onCancel}
    >
      {isEditing ? renderForm() : renderContent()}
    </EditSection>
  );
} 