import { Metadata } from 'next';
import Link from 'next/link';
import { getDocBySlug, processDocContent } from '@/lib/docs';
import DocsPage from '@/components/docs/DocsPage';

type Params = {
  slug?: string[];
};

type Props = {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params }: Props) {
  const slug = params.slug || ['introduction'];
  
  try {
    const doc = await getDocBySlug(slug);
    const { source, frontMatter } = await processDocContent(doc);

    return <DocsPage content={source} frontMatter={frontMatter} />;
  } catch (err) {
    console.error('Documentation page error:', err instanceof Error ? err.message : 'Unknown error');
    
    return (
      <div className="min-h-screen bg-gray-900 pt-16">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-white mb-4">
            Documentation Not Found
          </h1>
          <p className="text-gray-400">
            The requested documentation page could not be found. This could be because:
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-400">
            <li>The page has been moved or renamed</li>
            <li>The URL might be incorrect</li>
            <li>The documentation is still being written</li>
          </ul>
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug || ['introduction'];
  
  try {
    const doc = await getDocBySlug(slug);
    return {
      title: `${doc.metadata.title} | wIndexer Documentation`,
      description: doc.metadata.description,
    };
  } catch (err) {
    console.error('Metadata generation error:', err instanceof Error ? err.message : 'Unknown error');
    
    return {
      title: 'Documentation | wIndexer',
      description: 'wIndexer Documentation',
    };
  }
}

export function generateStaticParams(): Params[] {
  return [
    { slug: ['introduction'] },
    { slug: ['getting-started'] },
    { slug: ['architecture'] },
  ];
}
