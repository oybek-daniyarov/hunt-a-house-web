"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PropertyDetailsForm } from "./property-details-form";
import { PropertyLocationForm } from "./property-location-form";
import { ContactDetailsForm } from "./contact-details-form";
import { PreviewForm } from "./preview-form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  // Property Details
  propertyType: z.string().min(1, "Property type is required"),
  activityType: z.string().min(1, "Activity type is required"),
  bedrooms: z.string().min(1, "Number of bedrooms is required"),
  bathrooms: z.string().min(1, "Number of bathrooms is required"),
  minSize: z.string().min(1, "Minimum size is required"),
  maxSize: z.string().min(1, "Maximum size is required"),
  minBudget: z.string().min(1, "Minimum budget is required"),
  maxBudget: z.string().min(1, "Maximum budget is required"),
  budgetFrequency: z.string().min(1, "Budget frequency is required"),
  description: z.string(),

  // Property Location
  emirate: z.string().min(1, "Emirate is required"),
  city: z.string().min(1, "City is required"),
  areas: z.array(z.string()).min(1, "At least one area is required"),

  // Contact Details
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  contactMethods: z.array(z.string()).min(1, "At least one contact method is required"),
});

type FormData = z.infer<typeof formSchema>;

const defaultValues: Partial<FormData> = {
  propertyType: "",
  activityType: "",
  bedrooms: "",
  bathrooms: "",
  minSize: "",
  maxSize: "",
  minBudget: "",
  maxBudget: "",
  budgetFrequency: "",
  description: "",
  emirate: "",
  city: "",
  areas: [],
  name: "",
  email: "",
  phone: "",
  contactMethods: [],
};

const STEPS = {
  PROPERTY_DETAILS: 0,
  PROPERTY_LOCATION: 1,
  CONTACT_DETAILS: 2,
  PREVIEW: 3,
} as const;

export function LeadForm() {
  const [step, setStep] = useState<number>(STEPS.PROPERTY_DETAILS);
  
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted:", data);
    // TODO: Implement form submission
  };

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, STEPS.PREVIEW));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, STEPS.PROPERTY_DETAILS));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8 p-6">
        {step === STEPS.PROPERTY_DETAILS && (
          <PropertyDetailsForm />
        )}

        {step === STEPS.PROPERTY_LOCATION && (
          <PropertyLocationForm />
        )}

        {step === STEPS.CONTACT_DETAILS && (
          <ContactDetailsForm />
        )}

        {step === STEPS.PREVIEW && (
          <PreviewForm />
        )}

        <div className="flex justify-between mt-8">
          {step > STEPS.PROPERTY_DETAILS && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}

          {step < STEPS.PREVIEW && (
            <Button type="button" onClick={nextStep} className="ml-auto">
              Next
            </Button>
          )}

          {step === STEPS.PREVIEW && (
            <Button type="submit" className="ml-auto">
              Submit
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
} 