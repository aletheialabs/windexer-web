// src/app/layout.tsx
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import ClientLayout from './client-layout';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'wIndexer - Decentralized Solana Indexing Layer',
    template: '%s | wIndexer'
  },
  description: 'A decentralized autonomous incentivized indexing layer for Solana.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}