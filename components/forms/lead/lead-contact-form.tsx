import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { SubmitButton } from '@/components/forms/fields';
import { useSteps } from '@/components/steps/step-provider';
import { Checkbox } from '@/components/ui/checkbox';
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
import { getCurrentUser } from '@/lib/data/laravel/auth/auth.api';

const CONTACT_METHODS = [
  { id: 'email', label: 'Email', type: 'email' },
  { id: 'phone', label: 'Phone Call', type: 'phone' },
  { id: 'whatsapp', label: 'WhatsApp', type: 'phone' },
  { id: 'telegram', label: 'Telegram', type: 'phone' },
] as const;

const leadContactFormSchema = z.object({
  contact: z
    .object({
      whatsapp: z.object({
        active: z.boolean(),
        value: z.string(),
      }),
      phone: z.object({
        active: z.boolean(),
        value: z.string(),
      }),
      email: z.object({
        active: z.boolean(),
        value: z
          .string()
          .refine(
            (val) => !val || z.string().email().safeParse(val).success,
            'Please enter a valid email address'
          ),
      }),
      telegram: z.object({
        active: z.boolean(),
        value: z.string(),
      }),
    })
    .refine(
      (data) =>
        Object.values(data).some((method) => method.active && method.value),
      {
        message:
          'Please select at least one contact method and provide its value',
      }
    ),
});

type LeadContactFormData = z.infer<typeof leadContactFormSchema>;

const LeadContactForm = () => {
  const { updateStepData, stepData } = useSteps();

  const [user, setUser] = useState<App.Data.User.UserData | undefined>();

  const form = useForm<LeadContactFormData>({
    resolver: zodResolver(leadContactFormSchema),
    defaultValues: {
      contact: {
        whatsapp: { active: false, value: user?.phone ?? '' },
        phone: { active: false, value: user?.phone ?? '' },
        email: { active: true, value: user?.email ?? '' },
        telegram: { active: false, value: '' },
      },
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getCurrentUser();
      if (response.success) {
        setUser(response.data);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      if (user.email) {
        form.setValue('contact.email.value', user.email);
        form.setValue('contact.email.active', true);
      }
      if (user.phone) {
        form.setValue('contact.phone.value', user.phone);
        form.setValue('contact.phone.active', true);
      }
    }
  }, [form, user]);

  async function onSubmit(data: LeadContactFormData) {
    updateStepData(data);
    console.log(stepData);
  }

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl space-y-8"
      >
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Contact Details
          </h2>
          <p className="text-muted-foreground">
            Choose your preferred way of communication
          </p>
        </div>

        <div className="space-y-1">
          {CONTACT_METHODS.map((method) => (
            <div
              key={method.id}
              className="grid grid-cols-[150px_1fr] items-center gap-4 min-h-[2.3rem]"
            >
              <FormField
                control={form.control}
                name={`contact.${method.id}.active`}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        id={`contact.${method.id}.active`}
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          form.setValue(`contact.${method.id}.value`, '', {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          });
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal !m-0 !p-0">
                      {method.label}
                    </FormLabel>
                  </FormItem>
                )}
              />

              {form.watch(`contact.${method.id}.active`) && (
                <FormField
                  control={form.control}
                  name={`contact.${method.id}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        {method.type === 'phone' ? (
                          <PhoneInput
                            {...field}
                            value={field.value ?? ''}
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                          />
                        ) : (
                          <Input
                            {...field}
                            value={field.value ?? ''}
                            type={method.type}
                            placeholder={`Enter your ${method.label.toLowerCase()}`}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <SubmitButton text="Submit" />
      </form>
    </Form>
  );
};

export default LeadContactForm;
