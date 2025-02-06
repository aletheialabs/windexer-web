// src/app/client-layout.tsx
'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}