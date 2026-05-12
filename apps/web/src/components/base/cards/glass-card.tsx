import React from 'react';

import styles from './glass-card.module.css';

type GlassCardType =
  | 'glass'
  | 'metric'
  | 'initiative'
  | 'transparency'
  | 'verification'
  | 'testimonial';

interface GlassCardProps {
  type?: GlassCardType;
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({
  type = 'glass',
  children,
  className = '',
}: GlassCardProps) {
  const typeClass = styles[type] || styles.glass;
  return (
    <div className={`${styles.card} ${typeClass} ${className}`}>{children}</div>
  );
}
