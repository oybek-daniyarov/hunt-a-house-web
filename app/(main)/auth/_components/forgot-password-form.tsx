'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  handleFormError,
  handleFormSuccess,
} from '@/lib/client/laravel/helpers/form.helpers';
import { ResponseError } from '@/lib/client/laravel/types';
import { cn } from '@/lib/utils';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps
  extends React.ComponentPropsWithoutRef<'div'> {
  onSuccess?: () => void;
  onLogin?: () => void;
}

export function ForgotPasswordForm({
  className,
  onSuccess,
  onLogin,
  ...props
}: ForgotPasswordFormProps) {
  'use no memo';
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit() {
    if (isLoading) return;

    setIsLoading(true);
    try {
      // TODO: Implement forgot password action
      handleFormSuccess('Reset link has been sent to your email');

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      handleFormError(
        form,
        error as ResponseError,
        'Failed to send reset link'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="m@example.com"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
              <div className="text-center text-sm">
                Remember your password?{' '}
                <Link
                  href={onLogin ? '#' : '/auth/login'}
                  onClick={(e) => {
                    if (onLogin) {
                      e.preventDefault();
                      onLogin();
                    } else {
                      router.push('/auth/login');
                    }
                  }}
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Back to login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
