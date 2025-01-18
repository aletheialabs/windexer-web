import { processMdxContent } from './mdx';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define the documentation directory path relative to project root
const DOCS_DIRECTORY = path.join(process.cwd(), 'content/docs');

// Interface for document metadata
export interface DocMetadata {
  title: string;
  description?: string;
  category?: string;
  order?: number;
  tags?: string[];
  author?: string;
  lastUpdated?: string;
}

// Interface for complete document information
export interface DocInfo {
  slug: string;
  content: string;
  metadata: DocMetadata;
  prev?: { title: string; slug: string };
  next?: { title: string; slug: string };
}

export async function processDocContent(doc: DocInfo) {
    try {
      const mdxSource = await processMdxContent(doc.content);
      
      return {
        source: mdxSource,
        frontMatter: doc.metadata,
        navigation: {
          prev: doc.prev,
          next: doc.next,
        },
      };
    } catch (error) {
      console.error('Error processing doc content:', error);
      throw error;
    }
  }

/**
 * Retrieves all documentation files and their metadata
 * This is useful for generating documentation navigation and sitemaps
 */
export async function getAllDocs(): Promise<DocInfo[]> {
  // Read all files from the docs directory recursively
  const files = getAllFilesRecursively(DOCS_DIRECTORY);
  
  // Process each file to extract metadata and content
  const docs = await Promise.all(
    files.map(async (file) => {
      const slug = file
        .replace(DOCS_DIRECTORY, '')
        .replace(/\.mdx?$/, '')
        .split('/')
        .filter(Boolean);

      const doc = await getDocBySlug(slug);
      return doc;
    })
  );

  // Sort docs based on their order metadata
  return docs.sort((a, b) => {
    if (a.metadata.category === b.metadata.category) {
      return (a.metadata.order || 0) - (b.metadata.order || 0);
    }
    return (a.metadata.category || '').localeCompare(b.metadata.category || '');
  });
}

/**
 * Retrieves a specific documentation file by its slug
 * Includes metadata, content, and navigation links
 */
export async function getDocBySlug(slug: string[]): Promise<DocInfo> {
  const filePath = path.join(DOCS_DIRECTORY, ...slug) + '.mdx';
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Parse the front matter and content using gray-matter
  const { data, content } = matter(fileContent);

  // Get adjacent docs for navigation
  const allDocs = await getAllDocs();
  const currentIndex = allDocs.findIndex(doc => 
    doc.slug === slug.join('/'));
  
  const prev = currentIndex > 0 ? allDocs[currentIndex - 1] : undefined;
  const next = currentIndex < allDocs.length - 1 
    ? allDocs[currentIndex + 1] 
    : undefined;

  return {
    slug: slug.join('/'),
    content,
    metadata: {
      title: data.title,
      description: data.description,
      category: data.category,
      order: data.order,
      tags: data.tags,
      author: data.author,
      lastUpdated: data.lastUpdated,
    },
    prev: prev ? { title: prev.metadata.title, slug: prev.slug } : undefined,
    next: next ? { title: next.metadata.title, slug: next.slug } : undefined,
  };
}

/**
 * Recursively gets all files in a directory
 * Useful for processing nested documentation structure
 */
function getAllFilesRecursively(dir: string): string[] {
  const files = fs.readdirSync(dir);
  
  return files.reduce<string[]>((allFiles, file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      return [...allFiles, ...getAllFilesRecursively(filePath)];
    }
    
    if (file.endsWith('.mdx')) {
      return [...allFiles, filePath];
    }
    
    return allFiles;
  }, []);
}

/**
 * Gets the table of contents from a markdown/MDX content
 * Extracts headings and creates a nested structure
 */
export function getTableOfContents(content: string) {
  const headingLines = content.split('\n').filter(line => 
    line.match(/^#{2,4}\s/));
  
  return headingLines.map(line => {
    const level = line.match(/^(#{2,4})\s/)?.[1].length || 2;
    const text = line.replace(/^#{2,4}\s/, '');
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    return { level, text, slug };
  });
}

/**
 * Search through documentation content
 * Implements basic search functionality
 */
export async function searchDocs(query: string): Promise<DocInfo[]> {
  const allDocs = await getAllDocs();
  const searchTerms = query.toLowerCase().split(' ');
  
  return allDocs.filter(doc => {
    const searchableText = `
      ${doc.metadata.title} 
      ${doc.metadata.description || ''} 
      ${doc.content}
    `.toLowerCase();
    
    return searchTerms.every(term => searchableText.includes(term));
  });
}