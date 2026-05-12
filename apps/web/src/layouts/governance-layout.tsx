import React from 'react';

export default function GovernanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="governance-layout">
      {children}
    </div>
  );
}
