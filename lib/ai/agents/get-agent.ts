import { cache } from 'react';

import { client } from '@/sanity/lib/client';
import { Agent, agentQuery } from '@/sanity/queries/agent';
import { convertPromptToMarkdown } from './prompt-markdown';

export interface AgentWithMarkdown {
  _id: string;
  name: string;
  type: Agent['type'];
  systemPrompt: string;
  prompt: string;
  configuration: Agent['configuration'];
}

interface GetAgentOptions {
  variables?: Record<string, string>;
}

function replaceVariables(
  text: string,
  variables: Record<string, string> = {}
): string {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] || match;
  });
}

export const getAgent = cache(
  async (
    name: string,
    options: GetAgentOptions = {}
  ): Promise<AgentWithMarkdown | null> => {
    try {
      const agent = await client.fetch<Agent | null>(agentQuery, { name });
      if (!agent) return null;

      const markdown = convertPromptToMarkdown(agent);

      const prompt = [
        replaceVariables(markdown.promptBody, options.variables),
        markdown.contextRules.map((rule) => ({
          title: rule.title,
          content: replaceVariables(rule.content, options.variables),
        })),
        replaceVariables(markdown.outputInstructions, options.variables),
      ];

      const agentWithMarkdown = {
        _id: agent._id,
        name: agent.name,
        type: agent.type,
        systemPrompt: replaceVariables(
          markdown.systemPrompt,
          options.variables
        ),
        prompt: prompt.filter(Boolean).join('\n\n'),
        configuration: agent.configuration,
      };

      return agentWithMarkdown;
    } catch (error) {
      console.error('Error fetching agent:', error);
      return null;
    }
  }
);
