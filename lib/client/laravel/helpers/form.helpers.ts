import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import { ResponseError } from '@/lib/client/laravel/types';

export function handleFormError<T extends FieldValues>(
  form: UseFormReturn<T>,
  error: ResponseError | undefined,
  defaultMessage: string
) {
  if (error?.errors) {
    Object.entries(error.errors).forEach(([field, messages]) => {
      form.setError(field as Path<T>, {
        type: 'server',
        message: messages[0],
      });
    });
  } else {
    toast.error('Error', {
      description: error?.message || defaultMessage,
    });
  }
}

export function handleFormSuccess(message: string) {
  toast.success('Success', {
    description: message,
  });
}
