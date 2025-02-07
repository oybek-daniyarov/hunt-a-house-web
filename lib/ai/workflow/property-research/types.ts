import { ListingGeneratorType } from '@/lib/ai/agents/listing-generator/listing-generator.agent';
import { StepResult } from '@/lib/workflow/types';

export interface KeywordExtractionResult {
  keywords: {
    location?: string;
    emirate:
      | 'Dubai'
      | 'Abu Dhabi'
      | 'Sharjah'
      | 'Ajman'
      | 'Ras Al Khaimah'
      | 'Fujairah'
      | 'Umm Al Quwain';
    propertyType:
      | 'apartment'
      | 'villa'
      | 'studio'
      | 'penthouse'
      | 'townhouse'
      | 'loft'
      | 'duplex'
      | 'hotel apartment'
      | 'serviced apartment'
      | 'commercial villa'
      | 'residential building'
      | 'hotel';
    duration: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
    budget:
      | 'budget-friendly'
      | 'affordable'
      | 'moderate'
      | 'mid-range'
      | 'premium'
      | 'luxury'
      | 'ultra-luxury'
      | 'exclusive';
    peopleCount: number;
    bedroomSize:
      | 'studio'
      | '1BR'
      | '2BR'
      | '3BR'
      | '4BR'
      | '5BR'
      | '6BR+'
      | '7BR+'
      | '8BR+';
    intent:
      | 'holiday'
      | 'business'
      | 'shopping'
      | 'travel'
      | 'business travel'
      | 'relocation'
      | 'short-term'
      | 'long-term'
      | 'family living'
      | 'student accommodation'
      | 'corporate housing'
      | 'remote working'
      | 'vacation home';
    searchQuery?: string;
    originalQuery?: string;
    occupancyType?: 'single' | 'family' | 'sharing' | 'corporate' | 'student';
  };
  searchConfig: string;
}

export interface ResearchResult {
  text: string;
}

export interface PropertyListing {
  title: string;
  description: string;
  location: string;
  propertyType: string;
  price: string;
  duration: string;
  amenities?: string[];
}

// Step-specific metadata types
export interface KeywordExtractionMetadata extends Record<string, unknown> {
  query: string;
  processingTime: number;
}

export interface ResearchMetadata extends Record<string, unknown> {
  extractedKeywords: KeywordExtractionResult;
  processingTime: number;
}

export interface ListingGenerationMetadata extends Record<string, unknown> {
  researchResult: ResearchResult;
  processingTime: number;
}

// Workflow data type that tracks all step results with proper typing
export interface PropertyWorkflowData {
  query: string;
  'extract-keywords'?: StepResult<
    KeywordExtractionResult,
    KeywordExtractionMetadata
  >;
  'research-property'?: StepResult<ResearchResult, ResearchMetadata>;
  'generate-listing'?: StepResult<
    ListingGeneratorType,
    ListingGenerationMetadata
  >;
}
