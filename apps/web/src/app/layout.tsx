import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import WhatsAppButton from '@/components/ui/whatsapp-button';
import DesignTokenProvider from '@/providers/design-token-provider';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'OK Movement — Civic Infrastructure for National Renewal',
  description: 'Building the civic infrastructure, accountability systems, and people-powered coordination needed to reclaim Nigeria\'s future.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <DesignTokenProvider>
          {children}
          <WhatsAppButton />
        </DesignTokenProvider>
      </body>
    </html>
  );
}
