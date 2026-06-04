import React from 'react';

/**
 * Parses markdown frontmatter metadata.
 * Expects frontmatter enclosed in '---' at the beginning of the file.
 */
export const parseFrontmatter = (mdText) => {
  const frontmatter = {};
  let content = mdText;

  if (mdText.startsWith('---')) {
    const parts = mdText.split('---');
    if (parts.length >= 3) {
      const yaml = parts[1];
      content = parts.slice(2).join('---').trim();

      const lines = yaml.split('\n');
      for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex > -1) {
          const key = line.slice(0, colonIndex).trim();
          const val = line.slice(colonIndex + 1).trim().replace(/^['"]|['"]$/g, '');
          frontmatter[key] = val;
        }
      }
    }
  }

  return { frontmatter, content };
};

/**
 * Helper to slugify heading text for anchors.
 */
export const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-alphanumeric (except space/dash)
    .replace(/[\s_-]+/g, '-') // collapse spaces/dashes
    .replace(/^-+|-+$/g, ''); // trim leading/trailing dashes
};

/**
 * Splits markdown content into structural blocks.
 */
export const parseMarkdownBlocks = (markdownText) => {
  const blocks = [];
  const lines = markdownText.split('\n');
  let currentBlock = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 1. Custom struggles card grid block
    if (line.trim() === ':::grid') {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      const gridBlock = { type: 'grid', cards: [] };
      i++;
      while (i < lines.length && lines[i].trim() !== ':::') {
        const gridLine = lines[i].trim();
        if (gridLine.includes('|')) {
          const parts = gridLine.split('|').map((p) => p.trim());
          // format: card | icon | title | description
          if (parts[0] === 'card' && parts.length >= 4) {
            gridBlock.cards.push({
              icon: parts[1],
              title: parts[2],
              description: parts[3],
            });
          }
        }
        i++;
      }
      blocks.push(gridBlock);
      continue;
    }

    // 2. Fenced code block
    if (line.trim().startsWith('```')) {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      const lang = line.trim().slice(3) || 'javascript';
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push({ type: 'code', lang, content: codeLines.join('\n') });
      continue;
    }

    // 3. Headings (# to ######)
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      blocks.push({ type: 'heading', level, text, id: slugify(text) });
      continue;
    }

    // 4. Blockquotes
    if (line.startsWith('>')) {
      if (currentBlock && currentBlock.type !== 'blockquote') {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      if (!currentBlock) {
        currentBlock = { type: 'blockquote', lines: [] };
      }
      currentBlock.lines.push(line.slice(1).trim());
      continue;
    }

    // 5. Unordered Lists
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      if (currentBlock && currentBlock.type !== 'list') {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      if (!currentBlock) {
        currentBlock = { type: 'list', items: [] };
      }
      currentBlock.items.push(line.trim().slice(2));
      continue;
    }

    // 6. Ordered Lists
    const orderedListMatch = line.trim().match(/^(\d+)\.\s+(.*)$/);
    if (orderedListMatch) {
      if (currentBlock && currentBlock.type !== 'ordered-list') {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      if (!currentBlock) {
        currentBlock = { type: 'ordered-list', items: [] };
      }
      currentBlock.items.push(orderedListMatch[2]);
      continue;
    }

    // 7. Blank lines (signals end of paragraph)
    if (line.trim() === '') {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      continue;
    }

    // 8. Paragraph content accumulation
    if (!currentBlock) {
      currentBlock = { type: 'paragraph', lines: [] };
    }
    if (currentBlock.type === 'paragraph') {
      currentBlock.lines.push(line);
    } else {
      blocks.push(currentBlock);
      currentBlock = { type: 'paragraph', lines: [line] };
    }
  }

  if (currentBlock) {
    blocks.push(currentBlock);
  }

  return blocks;
};

/**
 * Component to format inline tokens safely using React elements.
 * Supports:
 * - Bold: **text**
 * - Italic: *text*
 * - Inline Code: `code`
 * - Links: [link text](url)
 */
export const FormattedText = ({ text }) => {
  if (!text) return null;

  // Regex splitting by:
  // 1. `code`
  // 2. **bold**
  // 3. *italic*
  // 4. [text](url)
  const tokenRegex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(tokenRegex);

  return (
    <>
      {parts.map((part, index) => {
        // Inline Code
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={index}
              className="px-1.5 py-0.5 rounded font-mono text-[0.85em] bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/10"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        // Bold
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className="font-extrabold text-slate-900 dark:text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        // Italic
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={index} className="italic text-slate-800 dark:text-slate-200">
              {part.slice(1, -1)}
            </em>
          );
        }
        // Links
        if (part.startsWith('[') && part.includes('](')) {
          const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (match) {
            const [, linkText, url] = match;
            const isExternal = url.startsWith('http');
            return (
              <a
                key={index}
                href={url}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="font-bold underline underline-offset-4 decoration-1 transition-colors cursor-pointer text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {linkText}
              </a>
            );
          }
        }
        // Normal text
        return part;
      })}
    </>
  );
};
