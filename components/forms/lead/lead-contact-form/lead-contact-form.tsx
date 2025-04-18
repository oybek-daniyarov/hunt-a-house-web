'use client';

import Link from 'next/link';

import { InputField, SubmitButton } from '@/components/forms/fields';
import { CheckboxField, SelectField } from '@/components/forms/fields/fields';
import { useAuth } from '@/components/providers/auth-provider';
import { Form } from '@/components/ui/form';
import { FormHeader } from '../form-header';
import { ContactMethodInput } from './contact-method';
import { CONTACT_METHODS } from './contact-methods';
import { useLeadForm } from './use-lead-form';

const LeadContactForm = () => {
  const { form, onSubmit, error } = useLeadForm();
  const { isAuthenticated } = useAuth();

  const maxViewsOptions = Array.from({ length: 10 }, (_, i) => i + 1).map(
    (value) => ({
      label: `${value} views`,
      value: value.toString(),
    })
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormHeader
          title="Contact Details"
          description="Please provide your contact information"
        />

        <div className="space-y-3">
          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-2 rounded-md border border-red-100">
              {error}
            </div>
          )}
          {!isAuthenticated && (
            <>
              <InputField
                name="name"
                label="Name*"
                description="Your name will be used to identify you in the system"
              />
              <InputField
                name="email"
                label="Email*"
                description="Your email address will be used to send you a lead activation link and create an account if you don't have one"
              />
            </>
          )}

          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            {CONTACT_METHODS.map((method) => (
              <ContactMethodInput
                key={method.id}
                method={method}
                control={form.control}
              />
            ))}
          </div>
          <SelectField
            name="maxViews"
            label="Max Views*"
            description="Control your lead's visibility by setting how many agents can view it. More views means more potential matches, but you may receive more contacts. Choose between 1-10 agents."
            options={maxViewsOptions}
          />
        </div>

        <CheckboxField
          name="terms"
          label={
            <>
              I agree to the{' '}
              <Link
                href="/terms-and-conditions"
                className="underline"
                target="_blank"
              >
                terms and conditions
              </Link>
            </>
          }
          description={
            <>
              By accepting, you agree that we can share your contact details
              with matched agents who will reach out to help with your property
              search. Your information will be handled according to our{' '}
              <Link
                href="/privacy-policy"
                className="underline"
                target="_blank"
              >
                privacy policy
              </Link>
            </>
          }
        />

        <SubmitButton text="Submit" />
      </form>
    </Form>
  );
};

export default LeadContactForm;
