import Constants from 'expo-constants';
import { Platform } from 'react-native';

import { ConfigKeys } from './type';

import { ClaimCriteriaType } from '@/services/api/index.type';

export const isArray = (item: any) => Array.isArray(item);

export const isString = (item: any) => item && typeof item === 'string';

// Is IOS
export const isIOS = () => Platform.OS === 'ios';

// Is Android
export const isAndroid = () => Platform.OS === 'android';

export const truncateAddress = (value: string, length: number) => {
  if (value?.length <= length) {
    return value;
  }

  const separator = '...';
  const stringLength = length - separator.length;
  const frontLength = Math.ceil(stringLength / 2);
  const backLength = Math.floor(stringLength / 2);

  return (
    value.substring(0, frontLength) +
    separator +
    value.substring(value.length - backLength)
  );
};

export const textToSentenceCase = (value: string) => {
  const str = value.toLowerCase();
  return str.charAt(0)?.toUpperCase?.() + str.substring(1);
};

// Get constant data
export const getConstants = (key: ConfigKeys) => {
  return (
    Constants.expoConfig?.extra?.[key] ||
    Constants.manifest2?.extra?.expoClient?.extra?.[key] ||
    Constants?.expoConfig?.extra?.[key]
  );
};

// Return claim word
export const abstractCriteriaHandler = (claim?: ClaimCriteriaType) => {
  switch (claim) {
    case 'emailDomain':
    case 'emailWhiteList':
      return 'email';

    case 'directAnswerQuestionnaire':
    case 'mutliChoiceQuestionnaire':
      return 'questionnaire';

    case 'twitterFollowers':
    case 'twitterInteractions':
      return 'twitter';

    default:
      return claim;
  }
};

export const prefixCreatorUsername = (name?: string) => {
  return `${name || '-'}.inverse.wtf`;
};
