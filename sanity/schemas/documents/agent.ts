import { orderRankField } from '@sanity/orderable-document-list';
import { Bot, Brain, Key, List, MessageSquare } from 'lucide-react';
import { defineField, defineType } from 'sanity';

const portableTextConfig = {
  type: 'block',
  styles: [
    { title: 'Normal', value: 'normal' },
    { title: 'H2', value: 'h2' },
    { title: 'H3', value: 'h3' },
  ],
  lists: [
    { title: 'Bullet', value: 'bullet' },
    { title: 'Numbered', value: 'number' },
  ],
  marks: {
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
      { title: 'Code', value: 'code' },
    ],
  },
};

export default defineType({
  name: 'agent',
  title: 'AI Agents',
  type: 'document',
  icon: Bot,
  description:
    'Configuration and prompts for AI agents used in the application',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'configuration', title: 'Configuration' },
    { name: 'prompts', title: 'Prompts' },
    { name: 'schema', title: 'Schema' },
    { name: 'messages', title: 'Messages' },
    { name: 'examples', title: 'Examples' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Agent Name',
      type: 'string',
      description: 'Unique identifier for the agent',
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'type',
      title: 'Agent Type',
      type: 'string',
      description: 'The type of AI agent and its primary function',
      options: {
        list: [
          { title: 'Keyword Extractor', value: 'keyword-extractor' },
          { title: 'Research', value: 'research' },
          { title: 'Listing Generator', value: 'listing-generator' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of what this agent does',
      group: 'basic',
    }),
    defineField({
      name: 'configuration',
      title: 'Agent Configuration',
      type: 'object',
      group: 'configuration',
      icon: Key,
      description: 'Technical configuration for the AI agent',
      fields: [
        defineField({
          name: 'model',
          title: 'AI Model',
          type: 'string',
          description: 'The AI model to use for this agent',
          initialValue: 'gemini-2.0-flash-exp',
        }),
        defineField({
          name: 'temperature',
          title: 'Temperature',
          type: 'number',
          description: 'Controls randomness in the output (0.0 to 1.0)',
          validation: (Rule) => Rule.min(0).max(1),
          initialValue: 0.7,
        }),
      ],
    }),
    defineField({
      name: 'systemPrompt',
      title: 'System Prompt',
      type: 'array',
      group: 'prompts',
      icon: Brain,
      description:
        'The base prompt that defines agent behavior and capabilities. Use {{input}} to reference user message.',
      of: [portableTextConfig],
    }),
    defineField({
      name: 'promptBody',
      title: 'Prompt Body',
      type: 'array',
      group: 'prompts',
      icon: MessageSquare,
      description:
        'The main content of the prompt with instructions and guidelines. Use {{input}} to reference user message.',
      validation: (Rule) => Rule.required(),
      of: [portableTextConfig],
    }),
    defineField({
      name: 'contextRules',
      title: 'Context Rules',
      type: 'array',
      group: 'prompts',
      icon: List,
      description: 'Rules and guidelines for the agent to follow',
      of: [
        {
          type: 'object',
          name: 'rule',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              type: 'array',
              title: 'Content',
              of: [portableTextConfig],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              content: 'content',
            },
            prepare({ title, content }) {
              return {
                title: title || 'No title',
                subtitle: content?.[0]?.children?.[0]?.text || 'No content',
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'outputInstructions',
      title: 'Output Instructions',
      type: 'array',
      group: 'prompts',
      icon: MessageSquare,
      description: 'Instructions for formatting the agent output',
      of: [portableTextConfig],
    }),
    defineField({
      name: 'messages',
      title: 'Example Messages',
      type: 'array',
      group: 'messages',
      icon: MessageSquare,
      description: 'Example message exchanges for training and documentation',
      of: [
        {
          type: 'object',
          name: 'message',
          fields: [
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              options: {
                list: [
                  { title: 'System', value: 'system' },
                  { title: 'User', value: 'user' },
                  { title: 'Assistant', value: 'assistant' },
                ],
              },
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [portableTextConfig],
            }),
            defineField({
              name: 'annotation',
              title: 'Annotation',
              type: 'text',
              description: 'Optional notes about this message',
            }),
          ],
          preview: {
            select: {
              role: 'role',
              content: 'content',
            },
            prepare({ role, content }) {
              return {
                title: role?.charAt(0).toUpperCase() + role?.slice(1),
                subtitle: content?.[0]?.children?.[0]?.text || 'No content',
              };
            },
          },
        },
      ],
    }),
    orderRankField({ type: 'agent' }),
  ],
  preview: {
    select: {
      title: 'name',
      type: 'type',
    },
    prepare({ title, type }) {
      return {
        title: title || 'Unnamed Agent',
        subtitle:
          type?.charAt(0).toUpperCase() + type?.slice(1) || 'No type specified',
      };
    },
  },
});
