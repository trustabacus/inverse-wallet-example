// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

module.exports = {
  ...config,
  resolver: {
    extraNodeModules: {
      ...require('node-libs-react-native'),
      ...require('expo-crypto-polyfills'),
    },
  },
};
