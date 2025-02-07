'use client';

import { useState } from 'react';
import { readStreamableValue } from 'ai/rsc';

import { researchLocationAction } from '@/lib/ai/actions/research-location/research-location.action';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Home() {
  const [generation, setGeneration] = useState<string>('');
  const [stages, setStages] = useState<string>('');

  console.log('generation', generation);
  return (
    <div>
      <button
        onClick={async () => {
          const { object } = await researchLocationAction(
            'i like hiking need studio for rent in dubai'
          );

          for await (const partialObject of readStreamableValue(object)) {
            if (partialObject) {
              setGeneration(
                JSON.stringify(partialObject.notifications, null, 2)
              );

              setStages(JSON.stringify(partialObject.stages, null, 2));
            }
          }
        }}
      >
        Ask
      </button>

      <pre>{generation}</pre>
      <pre>{stages}</pre>
    </div>
  );
}
