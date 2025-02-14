'use client';

import { useFormStatus } from 'react-dom';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SubmitButtonProps = {
  loadingText?: string;
  text?: string;
  className?: string;
};

export const SubmitButton = ({
  loadingText = 'Submitting...',
  text = 'Submit',
  className,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  const form = useFormContext();

  const isLoading = pending || form.formState.isSubmitting;
  const disabled =
    isLoading || form.formState.isSubmitting || !form.formState.isValid;
  return (
    <Button
      type="submit"
      size="lg"
      className={cn('w-full', className)}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {isLoading ? loadingText : text}
    </Button>
  );
};
