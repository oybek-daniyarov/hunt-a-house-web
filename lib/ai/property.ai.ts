import { openai } from '@ai-sdk/openai';
import { Output, smoothStream, streamText } from 'ai';

import getSearchAiPrompt from '@/lib/ai/prompt';
import jinaReaderTool from '@/lib/ai/tools/jina-reader.tool';
import searxSearchTool from '@/lib/ai/tools/searx-search.tool';
import { LocationSearchResponseSchema } from './types';

const model = openai('gpt-4o-mini');

export function searchPropertiesAI(
  query: string,
  filters: App.Data.Lead.LeadFiltersData
) {
  const system = getSearchAiPrompt(filters);

  return streamText({
    model,
    system,
    tools: { searxSearchTool, jinaReaderTool },
    toolChoice: 'auto',
    messages: [
      {
        role: 'assistant',
        content: `I am your helpful assistant, i will help you to find ideal property location for your needs`,
      },
      {
        role: 'user',
        content: `${query}`,
      },
    ],
    onChunk(event) {
      if (event.chunk.type === 'tool-call') {
        console.log('Called Tool: ', event.chunk.toolName);
      }
    },
    onStepFinish(event) {
      console.log(event);
      if (event.warnings) {
        console.log('Warnings: ', event.warnings);
      }
    },
    onFinish(event) {
      console.log('Fin reason: ', event.finishReason);
      console.log('Usage: ', event.usage);
    },
    temperature: 0.7,
    experimental_output: Output.object({
      schema: LocationSearchResponseSchema,
    }),
    maxSteps: 5,
    experimental_transform: smoothStream({ chunking: 'word' }),
  });
}
