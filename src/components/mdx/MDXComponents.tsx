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

interface CodeBlockContent {
  props?: {
    children?: string;
  };
}

// Creating named components separately to ensure proper display names
const PreComponent = forwardRef<HTMLPreElement, PreProps>(({ children }, ref) => (
  <div className="relative group">
    <pre ref={ref} className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
      {children}
    </pre>
    <button
      className="absolute top-2 right-2 p-2 rounded bg-gray-700 text-gray-300 
                 opacity-0 group-hover:opacity-100 transition-opacity"
      onClick={() => {
        const codeContent = (children as CodeBlockContent)?.props?.children;
        if (typeof codeContent === 'string') {
          navigator.clipboard.writeText(codeContent);
        }
      }}
    >
      Copy
    </button>
  </div>
));
PreComponent.displayName = 'Pre';

const CalloutComponent = ({ children, type = 'info' }: CalloutProps) => (
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
CalloutComponent.displayName = 'Callout';

const ExampleComponent = ({ children, live = false }: ExampleProps) => (
  <div className="border border-gray-700 rounded-lg overflow-hidden mb-6">
    {live ? (
      <div className="bg-gray-800 p-4">{children}</div>
    ) : (
      <div className="bg-gray-800 p-4">{children}</div>
    )}
  </div>
);
ExampleComponent.displayName = 'Example';

// Export the components object with our named components
const MDXComponents = {
  pre: PreComponent,
  Callout: CalloutComponent,
  Example: ExampleComponent,
};

export default MDXComponents;