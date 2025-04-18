import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

import { useAuth } from '@/components/providers/auth-provider';
import { useSteps } from '@/components/steps/step-provider';
import { handleFormSuccess } from '@/lib/client/laravel/helpers/form.helpers';
import { createLeadAction } from '@/lib/data/laravel/lead/lead.actions';
import { LeadContactFormData, leadContactFormSchema } from './schema';

const SUCCESS_MESSAGE = 'Lead created successfully';
const ERROR_MESSAGE = 'Failed to create lead';
const ERROR_MESSAGE_UNEXPECTED =
  'An unexpected error occurred while creating the lead';
const SUCCESS_REDIRECT_PATH = '/dashboard/user/leads';

export const useLeadForm = () => {
  const { updateStepData, stepData } = useSteps();
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const form = useForm<LeadContactFormData>({
    resolver: zodResolver(leadContactFormSchema),
    defaultValues: {
      contact: {
        phone: '',
        facebook: '',
        whatsapp: '',
        telegram: '',
      },
      email: '',
      name: '',
      maxViews: '10',
      terms: false,
    },
    mode: 'onBlur',
  });

  const findContactMethod = (type: string) => {
    return user?.contactMethods?.find((method) => method.type === type);
  };

  useEffect(() => {
    if (user) {
      form.setValue('email', user.email);
      form.setValue('contact.phone', user.phone || '');
      form.setValue('name', user.name || '');
      if (user.contactMethods && user.contactMethods.length > 0) {
        const whatsappContactMethod = findContactMethod('whatsapp');
        if (whatsappContactMethod) {
          form.setValue('contact.whatsapp', whatsappContactMethod.value);
        }
        const telegramContactMethod = findContactMethod('telegram');
        if (telegramContactMethod) {
          form.setValue('contact.telegram', telegramContactMethod.value);
        }
        const facebookContactMethod = findContactMethod('facebook');
        if (facebookContactMethod) {
          form.setValue('contact.facebook', facebookContactMethod.value);
        }
      }
    }
  }, [user, form]);

  // Watch the phone field to update WhatsApp
  const phoneValue = useWatch({
    control: form.control,
    name: 'contact.phone',
  });

  // Update WhatsApp when phone changes
  useEffect(() => {
    if (phoneValue && phoneValue.trim() !== '') {
      // Only update WhatsApp if it's empty or if phone has changed
      const currentWhatsApp = form.getValues('contact.whatsapp');
      if (!currentWhatsApp || currentWhatsApp === '') {
        form.setValue('contact.whatsapp', phoneValue);
      }
    }
  }, [phoneValue, form]);

  const onSubmit = async (data: LeadContactFormData) => {
    updateStepData({ data });
    setError(null);
    const payload = {
      locations: stepData.lead.location,
      propertyType: Number(stepData.lead.propertyType),
      activityType: Number(stepData.lead.activityType),
      bedrooms: stepData.lead.bedrooms ? Number(stepData.lead.bedrooms) : 0,
      bathrooms: stepData.lead.bathrooms ? Number(stepData.lead.bathrooms) : 0,
      minSize: stepData.lead.minSize ? Number(stepData.lead.minSize) : 0,
      maxSize: stepData.lead.maxSize ? Number(stepData.lead.maxSize) : 0,
      minBudget: stepData.lead.minBudget ? Number(stepData.lead.minBudget) : 0,
      maxBudget: stepData.lead.maxBudget ? Number(stepData.lead.maxBudget) : 0,
      budgetFrequency: stepData.lead
        .budgetFrequency as App.Enums.BudgetFrequency,
      description: stepData.lead.description,
      contact: data.contact,
      email: data.email,
      name: data.name,
      maxViews: Number(data.maxViews),
    };
    try {
      // @ts-expect-error - contact is optional
      const result = await createLeadAction(payload);

      if (result.success) {
        handleFormSuccess(SUCCESS_MESSAGE);
        router.push(SUCCESS_REDIRECT_PATH);
      } else {
        toast.error(result.error?.message || ERROR_MESSAGE);
        setError(result.error?.message || ERROR_MESSAGE);
      }
    } catch (error) {
      console.error('Failed to create lead:', error);
      toast.error(ERROR_MESSAGE_UNEXPECTED);
      setError(ERROR_MESSAGE_UNEXPECTED);
    }
  };

  return {
    form,
    onSubmit,
    error,
  };
};
