import { groq } from 'next-sanity';

export const agentQuery = groq`
  *[_type == "agent" && name == $name][0] {
    _id,
    name,
    type,
    systemPrompt[]{
      ...,
      markDefs[]{
        ...,
        _type == "variable" => {
          ...,
          value
        }
      }
    },
    promptBody[]{
      ...,
      markDefs[]{
        ...,
        _type == "variable" => {
          ...,
          value
        }
      }
    },
    contextRules[] {
      title,
      content[]{
        ...,
        markDefs[]{
          ...,
          _type == "variable" => {
            ...,
            value
          }
        }
      }
    },
    outputInstructions[]{
      ...,
      markDefs[]{
        ...,
        _type == "variable" => {
          ...,
          value
        }
      }
    },
    configuration {
      model,
      temperature
    }
  }
`;

// Type for the agent document
export interface Agent {
  _id: string;
  name: string;
  type: 'keyword-extractor' | 'research' | 'listing-generator';
  systemPrompt: any[]; // Portable Text
  promptBody: any[]; // Portable Text
  contextRules: Array<{
    title: string;
    content: any[]; // Portable Text
  }>;
  outputInstructions: any[]; // Portable Text
  configuration: {
    model: string;
    temperature: number;
  };
}
