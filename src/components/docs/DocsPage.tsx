'use client';

import React, { useState } from 'react';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { motion } from 'framer-motion';
import DocsSidebar from './DocsSidebar';
import { Menu, X } from 'lucide-react';

interface DocsPageProps {
  content: MDXRemoteSerializeResult;
  frontMatter: {
    title: string;
    description?: string;
  };
}

const DocsPage: React.FC<DocsPageProps> = ({ frontMatter }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="p-2 text-gray-400 hover:text-white"
          aria-label="Toggle menu"
        >
          {isMobileNavOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      <div className="flex">
        <DocsSidebar 
          isMobileOpen={isMobileNavOpen}
          onMobileClose={() => setIsMobileNavOpen(false)}
        />

        <main className="flex-1 px-4 py-8 lg:px-8 max-w-4xl mx-auto">
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
          </motion.article>
        </main>
      </div>
    </div>
  );
};

export default DocsPage;