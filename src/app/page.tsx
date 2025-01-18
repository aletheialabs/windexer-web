import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import { Metadata } from 'next';

// Define metadata for better SEO
export const metadata: Metadata = {
  title: 'wIndexer - Decentralized Solana Indexing Layer',
  description: 'A decentralized autonomous incentivized indexing layer for Solana, built for high performance and true decentralization.',
  openGraph: {
    title: 'wIndexer - Decentralized Solana Indexing Layer',
    description: 'A decentralized autonomous incentivized indexing layer for Solana.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <HeroSection />
      <FeaturesSection />
      
      {/* Add any additional sections you want to display on the homepage */}
      {/* For example: NetworkStats, Roadmap, Partners, etc. */}
    </div>
  );
}