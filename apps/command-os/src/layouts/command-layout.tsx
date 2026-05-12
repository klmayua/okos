import React from 'react';

export default function CommandLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="command-layout">
      {children}
    </div>
  );
}
