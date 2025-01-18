'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

// Sidebar navigation structure
const sidebarContent = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', slug: 'introduction' },
      { title: 'Quick Start', slug: 'quick-start' },
      { title: 'Installation', slug: 'installation' },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { title: 'Architecture Overview', slug: 'architecture' },
      { title: 'Network Nodes', slug: 'network-nodes' },
      { title: 'Economic Model', slug: 'economic-model' },
    ],
  },
  {
    title: 'Developer Guide',
    items: [
      { title: 'API Reference', slug: 'api-reference' },
      { title: 'Node Operation', slug: 'node-operation' },
      { title: 'Integration Guide', slug: 'integration-guide' },
    ],
  },
];

interface DocsSidebarProps {
  className?: string;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const DocsSidebar = ({ className = '', isMobileOpen, onMobileClose }: DocsSidebarProps) => {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<string[]>(['Getting Started']);

  const toggleSection = (title: string) => {
    setOpenSections(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  return (
    <nav
      className={`w-64 bg-gray-900 border-r border-gray-800 h-[calc(100vh-4rem)] overflow-y-auto fixed lg:sticky top-16 ${
        isMobileOpen ? 'fixed inset-0 z-40' : 'hidden lg:block'
      } ${className}`}
    >
      <div className="px-4 py-6">
        {sidebarContent.map((section) => (
          <div key={section.title} className="mb-6">
            <button
              onClick={() => toggleSection(section.title)}
              className="flex items-center justify-between w-full text-left text-gray-400 hover:text-white mb-2"
            >
              <span className="text-sm font-semibold">{section.title}</span>
              {openSections.includes(section.title) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            
            {openSections.includes(section.title) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-2"
              >
                {section.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/docs/${item.slug}`}
                    className={`block py-2 px-4 text-sm rounded-lg transition-colors ${
                      pathname === `/docs/${item.slug}`
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                    onClick={() => {
                      if (isMobileOpen && onMobileClose) {
                        onMobileClose();
                      }
                    }}
                  >
                    {item.title}
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default DocsSidebar;