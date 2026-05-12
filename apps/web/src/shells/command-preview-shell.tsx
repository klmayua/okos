'use client';

import React from 'react';

interface CommandPreviewShellProps {
  children: React.ReactNode;
}

export default function CommandPreviewShell({ children }: CommandPreviewShellProps) {
  return (
    <div className="command-preview-shell">
      {children}
    </div>
  );
}
