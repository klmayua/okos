'use client';

import React from 'react';

interface PageComposerProps {
  narrativeGoal: string;
  emotionalPacing: string;
  primaryCTA: string;
  visualDensity: 'low' | 'medium' | 'high';
  motionDensity: 'low' | 'medium' | 'high';
  children: React.ReactNode;
}

export default function PageComposer({
  narrativeGoal,
  emotionalPacing,
  primaryCTA,
  visualDensity,
  motionDensity,
  children,
}: PageComposerProps) {
  return (
    <div
      data-narrative-goal={narrativeGoal}
      data-emotional-pacing={emotionalPacing}
      data-primary-cta={primaryCTA}
      data-visual-density={visualDensity}
      data-motion-density={motionDensity}
    >
      {children}
    </div>
  );
}
