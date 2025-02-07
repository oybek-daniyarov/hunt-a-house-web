'use server';

import { google } from '@ai-sdk/google';
import { streamObject } from 'ai';
import { createStreamableValue } from 'ai/rsc';
import { z } from 'zod';

import keywordExtractorAgent from '@/lib/ai/agents/keyword-extractor/keyword-extractor.agent';

const LocationSearchResponseSchema = z.object({
  notifications: z.array(
    z.object({
      name: z.string().describe('Name of a fictional person.'),
    })
  ),
});

const LocationStageSchema = z.object({
  name: z.string().describe('Name of a fictional person.'),
  description: z.string().describe('Description of the stage.'),
});

export async function researchLocationAction(input: string) {
  'use server';

  const stream = createStreamableValue();

  stream.update({
    stages: [
      {
        name: 'Researching',
        description: 'Starting research',
      },
    ],
  });

  const { keywords, configuration, usage } = await keywordExtractorAgent(input);

  (async () => {
    const { partialObjectStream } = streamObject({
      model: google('gemini-2.0-flash-exp'),
      system: 'You generate three notifications for a messages app.',
      prompt: input,
      schema: LocationSearchResponseSchema,
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { object: stream.value };
}
