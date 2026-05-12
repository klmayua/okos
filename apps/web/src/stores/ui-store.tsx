'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface UIState {
  mobileMenuOpen: boolean;
  activeSection: string | null;
  modalOpen: boolean;
}

interface UIStoreContextValue extends UIState {
  setMobileMenuOpen: (open: boolean) => void;
  setActiveSection: (section: string | null) => void;
  setModalOpen: (open: boolean) => void;
}

const UIStoreContext = createContext<UIStoreContextValue | null>(null);

export function UIStoreProvider(props: { children: React.ReactNode }) {
  const [state, setState] = useState<UIState>({
    mobileMenuOpen: false,
    activeSection: null,
    modalOpen: false,
  });

  const setMobileMenuOpen = useCallback((open: boolean) => {
    setState((prev) => ({ ...prev, mobileMenuOpen: open }));
  }, []);

  const setActiveSection = useCallback((section: string | null) => {
    setState((prev) => ({ ...prev, activeSection: section }));
  }, []);

  const setModalOpen = useCallback((open: boolean) => {
    setState((prev) => ({ ...prev, modalOpen: open }));
  }, []);

  return (
    <UIStoreContext.Provider
      value={{ ...state, setMobileMenuOpen, setActiveSection, setModalOpen }}
    >
      {props.children}
    </UIStoreContext.Provider>
  );
}

export function useUIStore(): UIStoreContextValue {
  const ctx = useContext(UIStoreContext);
  if (!ctx) {
    throw new Error('useUIStore must be used within UIStoreProvider');
  }
  return ctx;
}
