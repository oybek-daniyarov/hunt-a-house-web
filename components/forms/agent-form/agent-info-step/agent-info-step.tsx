'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  AgentInfoStepData,
  agentInfoStepSchema,
} from '@/components/forms/agent-form/agent-info-step/schema';
import { FormHeader } from '@/components/forms/agent-form/form-header';
import {
  InputField,
  SelectField,
  SubmitButton,
} from '@/components/forms/fields';
import { useSteps } from '@/components/steps/step-provider';
import { Form } from '@/components/ui/form';

type AgentInfoStepProps = {
  locations: App.Services.Location.Data.LocationData[];
};

const companyTypes: App.Enums.CompanyType[] = ['real_estate', 'holiday_homes'];

const mapCompanyTypeToLabel = (type: App.Enums.CompanyType) => {
  return type === 'real_estate' ? 'Real Estate' : 'Holiday Homes';
};

export function AgentInfoStep({ locations }: AgentInfoStepProps) {
  'use no memo';
  const { updateStepData, goToNextStep } = useSteps();

  const form = useForm<AgentInfoStepData>({
    resolver: zodResolver(agentInfoStepSchema),
    defaultValues: {
      address: '',
      website: '',
      reraNumber: '',
      tradeLicense: '',
      companyName: '',
      companyType: companyTypes[0],
      companySize: '1',
      locationId: '',
      dtcmNumber: '',
    },
  });

  const companyTypeOptions = companyTypes.map((type) => ({
    label: mapCompanyTypeToLabel(type),
    value: type,
  }));

  const companySizeOptions = [
    { label: '1-5 employees', value: '5' },
    { label: '6-10 employees', value: '10' },
    { label: '11-20 employees', value: '20' },
    { label: '21-50 employees', value: '50' },
    { label: '51-100 employees', value: '100' },
    { label: '100+ employees', value: '101' },
  ];

  async function onSubmit(data: AgentInfoStepData) {
    updateStepData({
      agentInfo: data,
    });
    await goToNextStep();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormHeader
          title="Agent Information"
          description="Please provide your basic information"
        />
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <InputField name="companyName" label="Company Name*" />
          </div>

          <SelectField
            name="companyType"
            label="Company Type*"
            options={companyTypeOptions}
          />

          <SelectField
            name="companySize"
            label="Company Size*"
            options={companySizeOptions}
          />

          <SelectField
            name="locationId"
            label="Emirate*"
            options={locations.map((location) => ({
              label: location.name,
              value: location.id.toString(),
            }))}
          />

          <InputField
            name="website"
            label="Website"
            placeholder="https://example.com"
          />

          {form.watch('companyType') === 'real_estate' && (
            <InputField
              name="reraNumber"
              label="RERA Number*"
              description="Your Real Estate Regulatory Agency registration number"
            />
          )}

          {form.watch('companyType') === 'holiday_homes' && (
            <InputField
              name="dtcmNumber"
              label="DTCM Number*"
              description="Your DTCM registration number"
            />
          )}

          <InputField
            name="tradeLicense"
            label="Trade License"
            description="Your company trade license number"
          />

          <InputField
            name="address"
            label="Address"
            description="Your office address"
            className="col-span-2"
          />

          {form.formState.errors.root && (
            <p className="col-span-2 text-sm font-medium text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}

          <SubmitButton className="col-span-2" text="Next" />
        </div>
      </form>
    </Form>
  );
}
