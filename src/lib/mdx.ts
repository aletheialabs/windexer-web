// src/lib/mdx.tsx
import React from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import { DocInfo } from './docs';

interface PreProps {
  children: React.ReactNode;
}

interface CalloutProps {
  children: React.ReactNode;
  type?: 'info' | 'warning';
}

interface ExampleProps {
  children: React.ReactNode;
  live?: boolean;
}

// Define the shape of our MDX processing result
interface ProcessedContent {
  source: MDXRemoteSerializeResult;
  frontMatter: {
    title: string;
    description?: string;
  };
}

// Configuration for MDX processing - note the specific type for format
const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, {
      properties: {
        className: ['anchor']
      }
    }],
    rehypePrism
  ],
  // Remove format as it's not needed and was causing type issues
} as const;

// Process MDX content with proper error handling and typing
export async function processMdxContent(content: string): Promise<MDXRemoteSerializeResult> {
  try {
    return await serialize(content, {
      parseFrontmatter: true,
      mdxOptions
    });
  } catch (error) {
    console.error('Error processing MDX content:', error);
    throw error;
  }
}

// Process complete documentation with metadata
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

// Create a separate client component file for MDX components
// This will be in a separate file: src/components/mdx/MDXComponents.tsx
// Here we'll just export the type definition
export interface MDXComponents {
  pre: React.ComponentType<PreProps>;
  Callout: React.ComponentType<CalloutProps>;
  Example: React.ComponentType<ExampleProps>;
}

// Extract code blocks from MDX content
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