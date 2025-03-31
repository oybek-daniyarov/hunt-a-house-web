import { NextResponse } from 'next/server';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';

import { leadFormStepSchema } from '@/components/forms/lead/lead-form-step/schema';
import { getLeadFilters } from '@/lib/data/laravel/lead/lead.api';

export const runtime = 'nodejs';

const model = google('gemini-2.0-flash-exp');

/**
 * Generates property form data using AI based on user preferences
 */
export async function POST(req: Request) {
  try {
    // Parse the request data
    const { messages, location, prompt } = await req.json();

    // Get the available filters
    const filters = await getLeadFilters().catch((error) => {
      console.error('Failed to fetch lead filters:', error);
      throw new Error('Unable to load property filters');
    });

    // Format any user preferences for the prompt
    const userPreferences = [
      location && `- Location: ${JSON.stringify(location)}`,
      prompt && `- Additional Requirements: ${prompt}`,
    ]
      .filter(Boolean)
      .join('\n');

    // Create the prompt with structured sections
    const promptText = createPrompt(filters, {
      location,
      userPreferences,
      userPrompt: prompt,
    });

    // Generate the form data
    const result = await generateObject({
      model,
      prompt: promptText,
      messages,
      schema: leadFormStepSchema,
    });

    return result.toJsonResponse();
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate property form data' },
      { status: 500 }
    );
  }
}

/**
 * Creates a structured prompt for the AI model
 */
function createPrompt(
  filters: any,
  {
    location,
    propertyType,
    activityType,
    userPreferences,
    userPrompt,
  }: {
    location?: any;
    propertyType?: string;
    activityType?: string;
    userPreferences: string;
    userPrompt?: string;
  }
) {
  return `You are an AI assistant specialized in helping users fill out property lead forms. Your task is to generate appropriate form data based on user requirements and available filters.

Context about the form:
- This is a property lead form where users specify their property requirements
- The form has fields for location, property type, activity type (sale/rent), bedrooms, bathrooms, size, budget, and description
- All monetary values MUST be in AED (Arab Emirates Dirham) - do not use any other currency
- Size values MUST be in square feet (sqft)
- All text content MUST be in English language only

User's Initial Preferences:
${userPreferences || '- No specific preferences provided'}

${
  userPrompt
    ? `User's Specific Requirements:
${userPrompt}

Please make sure to incorporate the specific requirements above when generating the form data.`
    : ''
}

Available Filters (use IDs from these options):
${JSON.stringify(filters, null, 2)}

Guidelines for generating form data:
1. Location: ${location ? 'Use the pre-selected location provided above' : 'Use valid location names from the filters'}
2. Property Type: ${propertyType ? 'Use the pre-selected property type' : 'Use valid ID from propertyTypes filter'}
3. Activity Type: ${activityType ? 'Use the pre-selected activity type' : 'Use valid ID from activityTypes filter'}
4. Bedrooms/Bathrooms: 
   - Select appropriate number based on property type
   - Ensure bathroom count is reasonable for bedroom count
5. Size: 
   - Ensure minSize is less than maxSize (in sqft)
   - Size MUST be appropriate for the number of bedrooms and bathrooms:
     * Studio: 350-600 sqft
     * 1 bedroom: 550-950 sqft
     * 2 bedrooms: 800-1400 sqft
     * 3 bedrooms: 1200-2000 sqft
     * 4 bedrooms: 1800-3000 sqft
     * 5+ bedrooms: 2500+ sqft
   - Adjust size range based on property type (apartments typically smaller than villas)
6. Budget: 
   - Ensure minBudget is less than maxBudget (always in AED)
   - Use budgetFrequency from filters
   - Consider location and property type for budget range
7. Description: Generate a clear, concise description in English that includes:
   - Mention of the selected location
   - Property type and activity type
   - Key features (bedrooms, bathrooms, size)
   - Any specific requirements based on the selections${userPrompt ? " and the user's additional requirements" : ''}

Important:
- All text content MUST be in English
- All monetary values MUST be in AED
- All measurements MUST be in square feet (sqft)
- Square footage MUST be realistic for the number of bedrooms and bathrooms selected
- Generated values should be consistent with user's initial preferences${userPrompt ? ' and additional requirements' : ''}

Please generate form data that matches these requirements and the provided schema.`;
}
