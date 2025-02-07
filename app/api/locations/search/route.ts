import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { searchProperties } from '@/lib/data/laravel/property/property.api';

const searchParamsSchema = z.object({
  query: z.string().min(1),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const result = searchParamsSchema.safeParse({
      query: searchParams.get('query'),
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid search parameters' },
        { status: 400 }
      );
    }

    const { query } = result.data;
    const response = await searchProperties({ query });

    return NextResponse.json(
      response.data.map((property) => ({
        value: property.id,
        label: property.name,
      }))
    );
  } catch (error) {
    console.error('Location search error:', error);
    return NextResponse.json(
      { error: 'Failed to search locations' },
      { status: 500 }
    );
  }
}
