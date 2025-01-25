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

function formatBudget(min: number | null, max: number | null, frequency: string | null) {
  if (!min && !max) return 'Not specified';
  
  const formatNumber = (num: number) => 
    new Intl.NumberFormat('en-AE', { 
      style: 'currency', 
      currency: 'AED',
      maximumFractionDigits: 0 
    }).format(num);

  const range = [min && formatNumber(min), max && formatNumber(max)]
    .filter(Boolean)
    .join(' - ');

  const period = frequency === 'one_time' ? '' 
    : frequency === 'yearly' ? ' per year'
    : frequency === 'monthly' ? ' per month'
    : frequency === 'daily' ? ' per day'
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

export function BudgetSection({
  form,
  isEditing,
  propertyData,
  onEdit,
  onSave,
  onCancel,
  isGenerating
}: BudgetSectionProps) {
  const renderForm = () => (
    <Form {...form}>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="min_budget"
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
            name="max_budget"
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
          name="budget_frequency"
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
      </form>
    </Form>
  );

  const renderContent = () => (
    <p className="text-sm text-muted-foreground">
      {formatBudget(propertyData?.min_budget || null, propertyData?.max_budget || null, propertyData?.budget_frequency || null)}
    </p>
  );

  return (
    <EditSection
      title="Budget"
      isEditing={isEditing}
      isDisabled={isGenerating}
      onEdit={onEdit}
      onSave={onSave}
      onCancel={onCancel}
    >
      {isEditing ? renderForm() : renderContent()}
    </EditSection>
  );
} 