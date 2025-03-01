'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';
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
import { loginAction } from '@/lib/data/laravel/auth/auth.actions';
import { cn } from '@/lib/utils';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps extends React.ComponentPropsWithoutRef<'div'> {
  onSuccess?: () => void;
  onForgotPassword?: () => void;
  onRegister?: () => void;
}

export function LoginForm({
  className,
  onSuccess,
  onForgotPassword,
  onRegister,
  ...props
}: LoginFormProps) {
  'use no memo';
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { refreshAuth } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginFormData) {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const result = await loginAction(data);

      if (!result.success) {
        handleFormError(form, result.error, 'Invalid credentials');
        return;
      }

      handleFormSuccess('You have been logged in successfully');

      if (onSuccess) {
        onSuccess();
      } else if (result.redirect) {
        await refreshAuth();
        router.push(result.redirect);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href={onForgotPassword ? '#' : '/auth/forgot-password'}
                      onClick={(e) => {
                        if (onForgotPassword) {
                          e.preventDefault();
                          onForgotPassword();
                        } else {
                          router.push('/auth/forgot-password');
                        }
                      }}
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          <div className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link
              href={onRegister ? '#' : '/auth/register'}
              onClick={(e) => {
                if (onRegister) {
                  e.preventDefault();
                  onRegister();
                }
              }}
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
