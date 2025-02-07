interface MarkDef {
  _type: string;
  _key: string;
  value?: string;
}

interface Child {
  _type: string;
  text: string;
  marks?: string[];
}

interface Block {
  _type: string;
  style?: string;
  children?: Child[];
  markDefs?: MarkDef[];
}

function processMarks(
  text: string,
  marks: string[] = [],
  markDefs: MarkDef[] = []
): string {
  let result = text;

  // Process custom marks (variables)
  const variableMark = marks.find((mark) =>
    markDefs.find((def) => def._key === mark && def._type === 'variable')
  );

  if (variableMark) {
    const markDef = markDefs.find((def) => def._key === variableMark);
    if (markDef?.value) {
      return `{{${markDef.value}}}`;
    }
  }

  // Process standard marks
  marks.forEach((mark) => {
    switch (mark) {
      case 'strong':
        result = `**${result}**`;
        break;
      case 'em':
        result = `*${result}*`;
        break;
      case 'code':
        result = `\`${result}\``;
        break;
    }
  });

  return result;
}

function processBlock(block: Block): string {
  if (!block.children) return '';

  const content = block.children
    .map((child) => {
      if (child._type !== 'span') return child.text;
      return processMarks(child.text, child.marks, block.markDefs);
    })
    .join('');

  switch (block.style) {
    case 'h2':
      return `## ${content}\n\n`;
    case 'h3':
      return `### ${content}\n\n`;
    case 'blockquote':
      return `> ${content}\n\n`;
    default:
      return `${content}\n\n`;
  }
}

export function blockToMarkdown(blocks: Block[]): string {
  if (!blocks || !Array.isArray(blocks)) return '';

  return blocks
    .map((block) => {
      if (block._type !== 'block') return '';
      return processBlock(block);
    })
    .join('')
    .trim();
}

// Helper function to convert all agent prompt fields to markdown
export function convertPromptToMarkdown(agent: {
  systemPrompt?: Block[];
  promptBody?: Block[];
  contextRules?: Array<{ title: string; content: Block[] }>;
  outputInstructions?: Block[];
}) {
  return {
    systemPrompt: agent.systemPrompt ? blockToMarkdown(agent.systemPrompt) : '',
    promptBody: agent.promptBody ? blockToMarkdown(agent.promptBody) : '',
    contextRules:
      agent.contextRules?.map((rule) => ({
        title: rule.title,
        content: blockToMarkdown(rule.content),
      })) || [],
    outputInstructions: agent.outputInstructions
      ? blockToMarkdown(agent.outputInstructions)
      : '',
  };
}
