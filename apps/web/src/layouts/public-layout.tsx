import React from 'react';

import { defaultLayoutContract } from '@/types/layouts';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ maxWidth: defaultLayoutContract.maxContentWidth }}
      className="mx-auto"
    >
      {children}
    </div>
  );
}
