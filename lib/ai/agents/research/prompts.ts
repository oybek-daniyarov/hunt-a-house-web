import { KeywordExtractorType } from '../keyword-extractor/schema';

interface PromptConfig {
  keywords: KeywordExtractorType;
  configuration: string;
}

export function getDynamicPrompt({
  keywords,
  configuration,
}: PromptConfig): string {
  return `
SEARCH CONTEXT:
- Query: ${keywords.searchQuery}
- raw Query: ${keywords.originalQuery}

Requirements:
- Budget: ${keywords.budget}
- Bedrooms: ${keywords.bedroomSize}
- Occupants: ${keywords.peopleCount}
- Purpose: ${keywords.intent}
- Location: ${keywords.location}
Preferences: ${configuration}`;
}
