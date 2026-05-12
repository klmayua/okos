'use client';

import React from 'react';

interface CinematicStoryShellProps {
  children: React.ReactNode;
}

export default function CinematicStoryShell({ children }: CinematicStoryShellProps) {
  return (
    <div className="cinematic-story-shell">
      {children}
    </div>
  );
}
