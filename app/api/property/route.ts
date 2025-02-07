import { NextResponse } from 'next/server';
import { z } from 'zod';

import { searchPropertiesAI } from '@/lib/ai/property.ai';
import { getLeadFilters } from '@/lib/data/laravel/lead/lead.api';

const requestSchema = z.object({
  query: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query } = requestSchema.parse(body);
    const filters = await getLeadFilters();

    return searchPropertiesAI(query, filters).toTextStreamResponse();
  } catch (error) {
    console.error('Error analyzing property:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to analyze property' },
      { status: 500 }
    );
  }
}
