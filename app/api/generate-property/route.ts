import { NextResponse } from "next/server";
import { createDeepSeek, deepseek } from "@ai-sdk/deepseek";
import { streamObject } from "ai";
import { propertySchema } from "./schema";

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    const result = streamObject({
      model: deepseek("deepseek-chat"),
      schema: propertySchema,
      schemaName: "PropertyLead",
      schemaDescription: "A property lead with details about the desired property",
      prompt: `Given this property description: "${description}"
      You are a property requirements analyzer. Your task is to extract and structure property requirements from user input.

Key Instructions:
1. Location Handling:
   - Extract ONLY the exact locations mentioned in the input
   - Default to "Dubai" as emirate only if a Dubai area is mentioned
   - If a city is mentioned, set the emirate to the city's emirate,
   - IF community is mentioned, set the emirate to the community's emirate
   - If area is mentioned, set the emirate to the area's emirate
   - if building is mentioned, set the emirate to the building's emirate

2. Property Details:
   - property_type: Set ONLY if clearly indicated or implied by area (e.g., "apartment in JLT")
   - activity_type: 
     * Set to 1 (Buy) if words like "buy", "purchase", "own" are used
     * Set to 2 (Rent Long Term) if "rent" without timeframe
     * Set to 3 (Rent Short Term) if specifically mentioned
   - Set bedrooms/bathrooms if:
     * Explicitly mentioned OR
     * Can be predicted from size:
       - 400-600 sqft: Studio
       - 600-900 sqft: 1 bedroom
       - 900-1400 sqft: 2 bedrooms
       - 1400-2000 sqft: 3 bedrooms
       - 2000-3000 sqft: 4 bedrooms
       - 3000+ sqft: 5+ bedrooms
   - For size: Interpret based on:
     * Exact number: use ±20% for min/max (e.g., "1000 sqft" → min: 800, max: 1200)
     * Range given: use exact numbers
     * Descriptive terms:
       - "small": 400-800 sqft
       - "medium": 800-1500 sqft
       - "large": 1500-2500 sqft
       - "extra large/huge": 2500-4000 sqft
     * Bedrooms correlation:
       - Studio: 400-600 sqft
       - 1 bed: 600-900 sqft
       - 2 bed: 900-1400 sqft
       - 3 bed: 1400-2000 sqft
       - 4 bed: 2000-3000 sqft
       - 5+ bed: 3000+ sqft
     
3. Budget Interpretation:
   - Numbers under 1M without "buy/purchase" are assumed as yearly rent
   - For buying: If user says "40k", interpret as 40,000 down payment and set appropriate total budget
   - Set ranges based on:
     * Exact number: use ±20% for min/max
     * Range given: use exact numbers
     * Descriptive terms for buying:
       - "affordable": 500k-1.5M AED
       - "mid-range": 1.5M-3M AED
       - "luxury": 3M-7M AED
       - "ultra-luxury": 7M+ AED
     * Descriptive terms for yearly rent:
       - "affordable": 30k-80k AED
       - "mid-range": 80k-150k AED
       - "luxury": 150k-300k AED
       - "ultra-luxury": 300k+ AED
   - Budget frequency:
     * "one_time" for buying
     * "yearly" for annual rent
     * "monthly" for monthly payments
     * "daily" only if specifically for short term

4. Description Writing:
   - Start with the main requirement (buy/rent + location/type)
   - Only mention features that were specifically requested
   - Include location benefits only if the location was specified
   - Keep tone natural but factual
   - Don't repeat the structured data
`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error generating property data:", error);
    return NextResponse.json(
      { error: "Failed to generate property data" },
      { status: 500 }
    );
  }
} 