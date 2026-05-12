import React from 'react';

export default function SectionSkeleton() {
  return (
    <div className="section-skeleton" aria-hidden="true">
      <div className="skeleton-block" style={{ height: 32, width: 200, marginBottom: 24 }} />
      <div className="skeleton-block" style={{ height: 400 }} />
    </div>
  );
}
