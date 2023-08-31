import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const getWindowHeight = (divisible: number) => {
  return height / (divisible || 1);
};

export const getWindowWidth = (divisible: number) => {
  return width / (divisible || 1);
};

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width <= 375,
  flatList: {
    heightHalf: height / 2.5,
    height: height / 2,
    height1: height / 1.5,
  },
  modal: {
    height: {
      default: height / 2,
    },
  },
};
