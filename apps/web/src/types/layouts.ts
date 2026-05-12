/**
 * OK.OS — LAYOUT CONTRACTS
 * All layouts MUST use centralized spacing, shared grid, shared nav/footer contracts.
 */

export interface LayoutContract {
  maxContentWidth: string;
  sectionPadding: {
    desktop: { large: string; medium: string; small: string };
    mobile: { large: string; medium: string; small: string };
  };
  gridGutter: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
}

export interface NavigationContract {
  type: 'floating_glass' | 'stacked' | 'hidden';
  items: string[];
}

export interface FooterContract {
  type: 'institutional_dark' | 'minimal';
  sections: string[];
}

export const defaultLayoutContract: LayoutContract = {
  maxContentWidth: '1440px',
  sectionPadding: {
    desktop: { large: '140px', medium: '100px', small: '72px' },
    mobile: { large: '96px', medium: '72px', small: '48px' },
  },
  gridGutter: {
    desktop: '24px',
    tablet: '20px',
    mobile: '16px',
  },
};
