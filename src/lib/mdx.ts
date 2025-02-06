// src/lib/mdx.ts

import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import { DocInfo } from './docs';
import type { Plugin } from 'unified';
import type { Root } from 'mdast';

export interface ProcessedContent {
  source: MDXRemoteSerializeResult;
  frontMatter: {
    title: string;
    description?: string;
  };
}

// Define proper types for our MDX plugins
type RemarkPlugin = Plugin<[], Root>;
type RehypePlugin = Plugin<[], Root>;

// Configure MDX options with proper typing
const mdxOptions = {
  remarkPlugins: [remarkGfm] as RemarkPlugin[],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, {
      properties: {
        className: ['anchor']
      }
    }],
    rehypePrism
  ] as RehypePlugin[]
};

export async function processMdxContent(content: string): Promise<MDXRemoteSerializeResult> {
  try {
    return await serialize(content, {
      parseFrontmatter: true,
      mdxOptions: {
        ...mdxOptions,
      }
    });
  } catch (error) {
    console.error('Error processing MDX content:', error);
    throw error;
  }
}

export async function processDocContent(doc: DocInfo): Promise<ProcessedContent> {
  try {
    const source = await processMdxContent(doc.content);
    
    return {
      source,
      frontMatter: {
        title: doc.metadata.title,
        description: doc.metadata.description
      }
    };
  } catch (error) {
    console.error('Error processing doc content:', error);
    throw error;
  }
}

export function extractCodeBlocks(content: string): Array<{
  language: string;
  code: string;
}> {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const blocks: Array<{ language: string; code: string }> = [];
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    blocks.push({
      language: match[1] || 'text',
      code: match[2].trim()
    });
  }

  return blocks;
}