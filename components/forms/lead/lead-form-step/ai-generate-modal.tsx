'use client';

import { useEffect, useState } from 'react';
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { Loader2, Wand2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import { LocationSearchField } from '@/components/forms/fields';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { LeadFormStepData, leadFormStepSchema } from './schema';

type AIGenerateModalProps = {
  form: UseFormReturn<LeadFormStepData>;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  propertyTypeOptions: { label: string; value: string }[];
  activityTypeOptions: { label: string; value: string }[];
};

export function AIGenerateModal({
  form,
  isOpen,
  onOpenChange,
  propertyTypeOptions,
  activityTypeOptions,
}: AIGenerateModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');

  const { object, submit, error } = useObject({
    api: '/api/completion',
    schema: leadFormStepSchema,
  });

  // Handle AI generation success
  useEffect(() => {
    if (object) {
      // Update form values with AI generated data
      const fields = [
        'propertyType',
        'activityType',
        'bedrooms',
        'bathrooms',
        'minSize',
        'maxSize',
        'minBudget',
        'maxBudget',
        'budgetFrequency',
        'description',
      ] as const;

      fields.forEach((field) => {
        if (object[field]) {
          form.setValue(field, object[field]);
        }
      });

      // Stop loading state
      setIsGenerating(false);

      // Close modal
      onOpenChange(false);

      // Show success message
      toast.success('Success', {
        description: 'AI has helped fill your form based on your preferences',
      });
    }
  }, [form, object, onOpenChange]);

  // Handle AI generation error
  useEffect(() => {
    if (error) {
      setIsGenerating(false);
      toast.error('Error', {
        description:
          'There was an error generating the form data. Please try again.',
      });
    }
  }, [error]);

  const handleAIGenerate = () => {
    if (form.getValues('location').length === 0) {
      toast.error('Location is required');
      return;
    }
    setIsGenerating(true);
    submit({
      location: form.getValues('location'),
      prompt: prompt.trim() || undefined,
    });
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => onOpenChange(true)}
        className="mb-4 gap-2"
        variant="outline"
      >
        <Wand2 className="h-4 w-4" />
        Let AI Help Fill the Form
      </Button>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          // Prevent closing the dialog while generating
          if (isGenerating && !open) return;
          onOpenChange(open);
          if (!open) {
            // Reset prompt when dialog closes
            setPrompt('');
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Property Preferences</DialogTitle>
            <DialogDescription>
              Enter your basic preferences and let AI help fill out the rest of
              the form
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <div className="space-y-4 py-4">
              <LocationSearchField name="location" label="Location*" />
              <div className="space-y-2">
                <label htmlFor="prompt" className="text-sm font-medium">
                  Additional Requirements
                </label>
                <Textarea
                  id="prompt"
                  placeholder="Describe additional details about what you're looking for (optional)..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Example: &ldquo;I need a 2-bedroom apartment near
                  schools&rdquo; or &ldquo;Looking for a villa with a
                  garden&rdquo;
                </p>
              </div>
            </div>
          </Form>
          <DialogFooter className="sm:justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isGenerating}
            >
              Cancel
            </Button>
            <Button onClick={handleAIGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 me-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>Generate with AI</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
