// src/app/docs/[[...slug]]/page.tsx

import { Metadata } from 'next';
import { getDocBySlug, processDocContent } from '@/lib/docs';
import DocsPage from '@/components/docs/DocsPage';
import Link from 'next/link';

// Both params and searchParams need to be Promises in Next.js 15
interface PageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  try {
    // Await both params and searchParams
    const { slug } = await params;
    await searchParams; // We need to await this even if we don't use it
    
    const slugPath = slug || ['introduction'];
    
    const doc = await getDocBySlug(slugPath);
    const { source, frontMatter } = await processDocContent(doc);

    return (
      <DocsPage 
        content={source} 
        frontMatter={frontMatter}
      />
    );
  } catch (err) {
    console.error(
      "Documentation error:", 
      err instanceof Error ? err.message : "Unknown error"
    );

    return (
      <div className="min-h-screen bg-gray-900 pt-16">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-white mb-4">
            Documentation Not Found
          </h1>
          <p className="text-gray-400">
            We could not find the requested documentation page. Please check the URL and try again.
          </p>
          <div className="mt-8">
            <Link 
              href="/docs"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Return to Documentation Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

// Update metadata generation to handle Promise-based searchParams
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    await searchParams; // Need to await this even if unused
    const slugPath = slug || ['introduction'];
    const doc = await getDocBySlug(slugPath);
    
    return {
      title: `${doc.metadata.title} | wIndexer Documentation`,
      description: doc.metadata.description || 'wIndexer Documentation'
    };
  } catch {
    return {
      title: 'Documentation | wIndexer',
      description: 'wIndexer Documentation'
    };
  }
}

export function generateStaticParams() {
  return [
    { slug: ['introduction'] },
    { slug: ['getting-started'] },
    { slug: ['architecture'] },
  ];
}