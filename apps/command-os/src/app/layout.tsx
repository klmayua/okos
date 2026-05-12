import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { OperationalStoreProvider } from '@/stores/operational-store-provider';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Command.OS — Civic Operations',
  description: 'Operational coordination for OK.OS civic infrastructure.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <OperationalStoreProvider>{children}</OperationalStoreProvider>
      </body>
    </html>
  );
}
