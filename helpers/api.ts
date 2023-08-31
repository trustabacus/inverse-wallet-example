import { isPlainObject } from '@reduxjs/toolkit';

import { getConstants, textToSentenceCase } from './base';

// public endpoints
export const PublicEndpoints: string[] = ['fetchClaimedItems'];

// check if endpoint is public
export const isPublicEndpoint = (endpoint: string) => {
  return PublicEndpoints.includes(endpoint);
};

// format api error message
export const formatErrorMessage = (message?: string, statusCode?: any) => {
  const resMessage = message || '';

  return textToSentenceCase(resMessage);
};

// get api curl url
export const getAPIRequest = () => {
  const url = getConstants('API_BASE');
  return url;
};

// strip request undefined
export const stripRequestUndefined = (obj: any) => {
  if (!isPlainObject(obj)) {
    return obj;
  }
  const copy: Record<string, any> = { ...obj };
  for (const [k, v] of Object.entries(copy)) {
    if (typeof v === 'undefined') delete copy[k];
  }
  return copy;
};
