'use client';

import Link from 'next/link';

import { useAgentForm } from '@/components/forms/agent-form/agent-details-step/use-agent-form';
import { FormHeader } from '@/components/forms/agent-form/form-header';
import {
  InputField,
  SubmitButton,
  TextareaField,
} from '@/components/forms/fields';
import {
  CheckboxField,
  PhoneInputField,
} from '@/components/forms/fields/fields';
import { Form } from '@/components/ui/form';

export function AgentDetailsStep() {
  'use no memo';

  const { form, onSubmit } = useAgentForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormHeader
          title="Additional Details"
          description="Please provide additional information about your agency"
        />

        <div className="space-y-3">
          <InputField name="name" label="Full Name*" />

          <InputField name="email" label="Email*" />

          <PhoneInputField name="phone" label="Phone*" defaultCountry="AE" />
          <TextareaField name="additionalInfo" label="Additional Information" />
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
              By accepting, you agree to our terms of service and that your
              information will be handled according to our{' '}
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
}
