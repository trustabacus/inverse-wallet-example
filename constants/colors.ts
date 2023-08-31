const Colors = {
  light: {
    iconColor: '#98A2B3',
    text: '#FFFFFF',
    textFaded: '#98A2B3',
    dark: '#000000',
    background: '#0F0F0F',
    backgroundFaded: 'rgba(255, 255, 255, .05)',
    primary: '#7F56D9',
    border: 'rgba(255, 255, 255, 0.1)',
    transparent: 'transparent',
    backdropBg: 'rgba(0,0,0,.6)',
    modalBg: '#202122',
    danger: '#E03347',
  },
  dark: {
    iconColor: '#98A2B3',
    text: '#FFFFFF',
    textFaded: '#98A2B3',
    dark: '#000000',
    background: '#0F0F0F',
    backgroundFaded: 'rgba(255, 255, 255, .05)',
    primary: '#7F56D9',
    border: 'rgba(255, 255, 255, 0.1)',
    transparent: 'transparent',
    backdropBg: 'rgba(0,0,0,.6)',
    modalBg: '#202122',
    danger: '#E03347',
  },
};

export default Colors;

export type ColorNameProps = keyof typeof Colors.light &
  keyof typeof Colors.dark;
