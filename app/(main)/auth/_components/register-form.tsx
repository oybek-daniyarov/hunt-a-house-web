'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import * as z from 'zod';

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
import { PhoneInput } from '@/components/ui/phone-input';
import {
  handleFormError,
  handleFormSuccess,
} from '@/lib/client/laravel/helpers/form.helpers';
import { registerAction } from '@/lib/data/laravel/auth/auth.actions';
import { cn } from '@/lib/utils';

const registerSchema = z
  .object({
    name: z.string().min(1, 'Please enter your name'),
    email: z.string().email('Please enter a valid email'),
    phone: z.string().refine(isValidPhoneNumber, {
      message: 'Please enter a valid phone number',
    }),
    password: z
      .string()
      .min(6, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character'
      ),
    password_confirmation: z.string(),
    license: z.string().optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation'],
  });

interface RegisterFormProps extends React.ComponentPropsWithoutRef<'div'> {
  userType: 'agent' | 'user';
  onSuccess?: () => void;
  onGoogleSignup?: () => void;
  onLogin?: () => void;
}

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm({
  className,
  userType,
  onSuccess,
  onLogin,
  ...props
}: RegisterFormProps) {
  'use no memo';
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
      license: '',
    },
  });

  async function onSubmit(data: RegisterFormData) {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const result = await registerAction({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        password_confirmation: data.password_confirmation,
        type: userType as App.Enums.UserType,
        licenseNumber: data.license || null,
      });

      if (!result.success) {
        handleFormError(form, result.error, 'Registration failed');
        return;
      }

      handleFormSuccess('Your account has been created successfully');

      if (onSuccess) {
        onSuccess();
      } else if (result.redirect) {
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="John Doe"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      defaultCountry="AE"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {userType === 'agent' && (
              <FormField
                control={form.control}
                name="license"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Real Estate License Number</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your license number"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create Account'}
          </Button>
          <div className="text-center text-sm">
            Already have an account?{' '}
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
              Login
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
