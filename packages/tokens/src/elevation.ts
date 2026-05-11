export const elevation = {
  level0: {
    zIndex: 0,
    shadow: 'none',
  },
  level1: {
    zIndex: 10,
    shadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  },
  level2: {
    zIndex: 20,
    shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  },
  level3: {
    zIndex: 30,
    shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
  level4: {
    zIndex: 40,
    shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
  level5: {
    zIndex: 50,
    shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
} as const;

export type ElevationLevel = keyof typeof elevation;