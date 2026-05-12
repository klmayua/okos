import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import DesignTokenProvider from '@/providers/design-token-provider';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'OK.OS — Civic Operating Infrastructure',
  description: 'Nigeria Will Not Change Without Your PVC.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <DesignTokenProvider>{children}</DesignTokenProvider>
      </body>
    </html>
  );
}
