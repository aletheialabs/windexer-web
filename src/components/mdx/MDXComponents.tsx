// src/components/mdx/MDXComponents.tsx
'use client';

import React, { forwardRef } from 'react';

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

// Create named components with proper display names
const Pre = forwardRef<HTMLPreElement, PreProps>(({ children }, ref) => (
  <pre ref={ref} className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
    {children}
  </pre>
));
Pre.displayName = 'Pre';

const Callout = ({ children, type = 'info' }: CalloutProps) => (
  <div
    className={`p-4 rounded-lg mb-4 ${
      type === 'warning'
        ? 'bg-yellow-900/20 border-l-4 border-yellow-500'
        : 'bg-blue-900/20 border-l-4 border-blue-500'
    }`}
  >
    {children}
  </div>
);
Callout.displayName = 'Callout';

const Example = ({ children, live = false }: ExampleProps) => (
  <div className="border border-gray-700 rounded-lg overflow-hidden mb-6">
    {live ? (
      <div className="bg-gray-800 p-4">{children}</div>
    ) : (
      <div className="bg-gray-800 p-4">{children}</div>
    )}
  </div>
);
Example.displayName = 'Example';

// Export the components object
const MDXComponents = {
  pre: Pre,
  Callout,
  Example,
};

export default MDXComponents;