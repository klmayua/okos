import React from 'react';

export default function CardSkeleton() {
  return (
    <div className="card-skeleton" aria-hidden="true">
      <div className="skeleton-block" style={{ height: 160 }} />
      <div className="skeleton-block" style={{ height: 20, width: '60%', marginTop: 16 }} />
      <div className="skeleton-block" style={{ height: 16, width: '40%', marginTop: 8 }} />
    </div>
  );
}
