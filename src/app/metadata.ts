// src/app/metadata.ts
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'wIndexer - Decentralized Solana Indexing Layer',
    template: '%s | wIndexer'
  },
  description: 'A decentralized autonomous incentivized indexing layer for Solana.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' }
  ]
};