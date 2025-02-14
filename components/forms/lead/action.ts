'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export type ActionState = {
  errors?: {
    location?: string[];
    propertyType?: string[];
    activityType?: string[];
    bedrooms?: string[];
    bathrooms?: string[];
    minSize?: string[];
    maxSize?: string[];
    minBudget?: string[];
    maxBudget?: string[];
    description?: string[];
    form?: string[];
  };
};

const leadFormSchema = z.object({
  location: z.string().min(1, 'Location is required'),
  propertyType: z.string().min(1, 'Property type is required'),
  activityType: z.string().min(1, 'Activity type is required'),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  minSize: z.string().optional(),
  maxSize: z.string().optional(),
  minBudget: z.string().optional(),
  maxBudget: z.string().optional(),
  description: z.string().optional(),
});

export async function saveLead(
  prevState: any,
  formData: FormData
): Promise<ActionState> {
  try {
    console.log('prevState', prevState);
    console.log('formData', formData);

    const rawFormData = {
      location: formData.get('location'),
      propertyType: formData.get('propertyType'),
      activityType: formData.get('activityType'),
      bedrooms: formData.get('bedrooms'),
      bathrooms: formData.get('bathrooms'),
      minSize: formData.get('minSize'),
      maxSize: formData.get('maxSize'),
      minBudget: formData.get('minBudget'),
      maxBudget: formData.get('maxBudget'),
      description: formData.get('description'),
    };

    // Validate form data with Zod
    const validatedData = leadFormSchema.safeParse(rawFormData);

    if (!validatedData.success) {
      // Return validation errors
      return {
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    const data = validatedData.data;

    // Here you would typically save the data to your database
    console.log('Form data:', data);

    // Revalidate the leads page to show the new data
    revalidatePath('/leads');

    // Redirect to the leads page or success page
    redirect('/leads');
  } catch (error) {
    // Return the error to be handled by the nearest error boundary
    return {
      errors: {
        form: ['Something went wrong while submitting the form'],
      },
    };
  }
}
