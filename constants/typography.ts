/**
 * All fonts
 * @Note use when you need to add font to component
 */
export const Fonts = {
  text: {
    regular: 'text-regular',
    medium: 'text-medium',
    semiBold: 'text-semiBold',
    bold: 'text-bold',
  },
  number: {},
};

const defaultFontSize = {
  text: {
    lg: 20,
    base: 18,
    sm: 16,
    xs: 14,
    xxs: 12,
  },
  heading: {
    h1: 30,
    h2: 26,
    h3: 22,
    display: 50,
    display1: 38,
    display2: 34,
  },
};

// Font sizes
export const FontSize = {
  text: {
    lg: defaultFontSize.text.lg,
    base: defaultFontSize.text.base,
    sm: defaultFontSize.text.sm,
    xs: defaultFontSize.text.xs,
    xxs: defaultFontSize.text.xxs,
  },
  heading: {
    h1: defaultFontSize.heading.h1,
    h2: defaultFontSize.heading.h2,
    h3: defaultFontSize.heading.h3,
    display: defaultFontSize.heading.display,
    display1: defaultFontSize.heading.display1,
    display2: defaultFontSize.heading.display2,
  },
};

export type FontsType = keyof typeof Fonts;

export type FontKeysType = keyof typeof Fonts.text | keyof typeof Fonts.number;

export type TextFontSizeType = keyof typeof FontSize.text;

export type HeadingFontSizeType = keyof typeof FontSize.heading;

export type FontSizeType = TextFontSizeType | HeadingFontSizeType;

/**
 * Return font size without the need of referencing it util prop (text or heading)
 * - If @type is not define, return text base
 * @param {String} [type] Fontsize util property
 */
export const getFontSize = (type: FontSizeType) => {
  if (type) {
    return FontSize.text[type as never] || FontSize.heading[type as never];
  }

  return FontSize.text.base;
};
