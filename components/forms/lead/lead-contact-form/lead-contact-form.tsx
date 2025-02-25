'use client';

import { SubmitButton } from '@/components/forms/fields';
import { Form } from '@/components/ui/form';
import { ContactMethodInput } from './contact-method';
import { CONTACT_METHODS } from './contact-methods';
import { FormHeader } from './form-header';
import { useLeadForm } from './use-lead-form';

const LeadContactForm = () => {
  const { form, onSubmit } = useLeadForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl space-y-8"
      >
        <FormHeader />

        <div className="space-y-4">
          {CONTACT_METHODS.map((method) => (
            <ContactMethodInput
              key={method.id}
              method={method}
              control={form.control}
            />
          ))}
        </div>

        <SubmitButton text="Submit" />
      </form>
    </Form>
  );
};

export default LeadContactForm;
