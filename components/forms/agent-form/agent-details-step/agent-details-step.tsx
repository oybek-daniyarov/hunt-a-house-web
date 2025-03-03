'use client';

import Link from 'next/link';

import { useAgentForm } from '@/components/forms/agent-form/agent-details-step/use-agent-form';
import { FormHeader } from '@/components/forms/agent-form/form-header';
import {
  InputField,
  SubmitButton,
  TextareaField,
} from '@/components/forms/fields';
import { CheckboxField } from '@/components/forms/fields/fields';
import { Form } from '@/components/ui/form';

export function AgentDetailsStep() {
  const { form, onSubmit } = useAgentForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormHeader
          title="Additional Details"
          description="Please provide additional information about your agency"
        />
        <div className="space-y-3">
          <InputField
            name="address"
            label="Address"
            description="Your office address"
          />

          <InputField
            name="website"
            label="Website"
            description="Your company website"
          />

          <InputField
            name="reraNumber"
            label="RERA Number"
            description="Your Real Estate Regulatory Agency registration number"
          />

          <InputField
            name="tradeLicense"
            label="Trade License"
            description="Your company trade license number"
          />

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
