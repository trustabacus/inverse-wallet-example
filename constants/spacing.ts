import { Sizing } from './sizing';

export const Spacing = {
  none: Sizing[0],
  xs: Sizing[0.5], // 2
  sm: Sizing[1], // 4
  md: Sizing[2], // 8
  xmd: Sizing[3], // 12
  base: Sizing[4], // 16
  lg: Sizing[5], // 20
  xl: Sizing[8], // 32
  xxl: Sizing[10], // 40
  xxxl: Sizing[16],
  xxxxl: Sizing[40],
};

export type SpacingType = keyof typeof Spacing;
