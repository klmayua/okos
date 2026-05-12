import React from 'react';

export default function TransparencyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="transparency-layout">
      {children}
    </div>
  );
}
