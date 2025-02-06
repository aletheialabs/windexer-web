// src/app/page.tsx
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';

// Define metadata for better SEO
export const metadata = {
  title: 'wIndexer - Decentralized Solana Indexing Layer',
  description: 'A decentralized autonomous incentivized indexing layer for Solana, built for high performance and true decentralization.',
  openGraph: {
    title: 'wIndexer - Decentralized Solana Indexing Layer',
    description: 'A decentralized autonomous incentivized indexing layer for Solana.',
    type: 'website',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'wIndexer'
    }]
  }
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}