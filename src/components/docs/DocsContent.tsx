'use client';

import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { motion } from 'framer-motion';

// Define proper types for our props and components
interface NavigationLink {
  title: string;
  slug: string;
}

interface FrontMatter {
  title: string;
  description?: string;
  prev?: NavigationLink;
  next?: NavigationLink;
}

interface DocsContentProps {
  content: MDXRemoteSerializeResult;
  frontMatter: FrontMatter;
}

// Define types for MDX components
interface MDXComponentProps {
  children: React.ReactNode;
  className?: string;
}

const DocsContent: React.FC<DocsContentProps> = ({ content, frontMatter }) => {
  // Custom MDX components with proper typing
  const components = {
    h1: ({ children, ...props }: MDXComponentProps) => (
      <h1 className="text-3xl font-bold mb-6" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: MDXComponentProps) => (
      <h2 className="text-2xl font-bold mt-8 mb-4" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: MDXComponentProps) => (
      <h3 className="text-xl font-bold mt-6 mb-3" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }: MDXComponentProps) => (
      <p className="mb-4 text-gray-300 leading-relaxed" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }: MDXComponentProps) => (
      <ul className="mb-4 ml-6 list-disc text-gray-300" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: MDXComponentProps) => (
      <ol className="mb-4 ml-6 list-decimal text-gray-300" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: MDXComponentProps) => (
      <li className="mb-2" {...props}>
        {children}
      </li>
    ),
    code: ({ children, ...props }: MDXComponentProps) => (
      <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm" {...props}>
        {children}
      </code>
    ),
    pre: ({ children, ...props }: MDXComponentProps) => (
      <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto mb-6" {...props}>
        {children}
      </pre>
    ),
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <h1 className="text-4xl font-bold mb-4">{frontMatter.title}</h1>
      {frontMatter.description && (
        <p className="text-xl text-gray-400 mb-8">{frontMatter.description}</p>
      )}
      <MDXRemote {...content} components={components} />
      
      {/* Navigation */}
      <div className="mt-12 pt-6 border-t border-gray-800 grid grid-cols-2 gap-4">
        {frontMatter.prev && (
          <div>
            <div className="text-sm text-gray-400">Previous</div>
            <a href={`/docs/${frontMatter.prev.slug}`} className="text-blue-400 hover:text-blue-300">
              {frontMatter.prev.title}
            </a>
          </div>
        )}
        {frontMatter.next && (
          <div className="text-right">
            <div className="text-sm text-gray-400">Next</div>
            <a href={`/docs/${frontMatter.next.slug}`} className="text-blue-400 hover:text-blue-300">
              {frontMatter.next.title}
            </a>
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default DocsContent;