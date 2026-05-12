'use client';

import React from 'react';

interface ModalTransitionProps {
  children: React.ReactNode;
  open: boolean;
}

export default function ModalTransitions({ children, open }: ModalTransitionProps) {
  return (
    <div
      className="modal-transition"
      style={{
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 300ms ease, transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: open ? 'auto' : 'none',
      }}
    >
      {children}
    </div>
  );
}
