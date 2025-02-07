import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

import { getDynamicPrompt } from '@/lib/ai/agents/research/prompts';
import { MODEL_NAME } from '@/lib/ai/constantas';
import jinaReaderTool from '@/lib/ai/tools/jina-reader.tool';
import searxSearchTool from '@/lib/ai/tools/searx-search.tool';
import { getAgent } from '../get-agent';
import { KeywordExtractorType } from '../keyword-extractor/schema';
import { ResearchSchema, ResearchType } from './schema';

export type ResearchAgentInput = {
  params: {
    configuration: string;
    keywords: KeywordExtractorType;
  };
};

const researchAgent = async ({
  params: { configuration, keywords },
}: ResearchAgentInput) => {
  const model = google(MODEL_NAME);

  const agent = await getAgent('research-agent');

  if (!agent) {
    throw new Error('Research agent not found');
  }

  const prompt = `
  ${getDynamicPrompt({ configuration, keywords })}
  ${agent.prompt}
  `;

  try {
    const result = await generateText({
      system: agent.systemPrompt,
      model,
      prompt,
      temperature: agent.configuration.temperature,
      tools: { searxSearchTool, jinaReaderTool },
      maxSteps: 5,
    });

    if (!result || !result.text) {
      throw new Error('Research agent returned empty results');
    }

    return result;
  } catch (error) {
    console.error('Research agent error:', error);
    throw new Error('Failed to complete property research');
  }
};

export default researchAgent;
export { ResearchSchema };
export type { ResearchType };
