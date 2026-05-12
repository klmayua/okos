import React from 'react';

export default function NarrativeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="narrative-layout">
      {children}
    </div>
  );
}
