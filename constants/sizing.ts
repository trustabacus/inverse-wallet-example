/**
 * This help achieve a unify sizing especially in our component (button, icon-button, etc.)
 * e.g. The default height for button component is 40
 * which equivalent to Sizing[10]
 * To understand the reason behind this, refer to the "Fundamentals" guide:
 * https://medium.com/eightshapes-llc/size-in-design-systems-64f234aec519
 *
 */
export const Sizing = {
  0: 0,
  0.25: 1,
  0.5: 2,
  0.75: 3,
  1: 4,
  1.5: 6,
  2: 8,
  3: 12,
  3.5: 14,
  4: 16,
  4.5: 18,
  5: 20,
  6: 24,
  6.5: 26,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  13: 52,
  14: 56,
  15: 60,
  16: 64,
  17: 68,
  18: 72,
  19: 76,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
};

export const CustomSizing = {
  input: 105,
};

export const iconSizes = {
  xxxs: Sizing[3.5], // 14
  xxs: Sizing[4.5], // 18
  xs: Sizing[6], // 24
  sm: Sizing[8], // 32
  md: Sizing[10], // 40
  lg: Sizing[12], // 48
  xl: Sizing[14], // 56
  xxl: Sizing[16], // 64
  xxxl: Sizing[18], // 72
};
