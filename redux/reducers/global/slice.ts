import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SessionStructType } from '@/helpers/wallet/type';
import {
  GenerateMobileWalletConfigsResponse,
  ItemType,
  User,
} from '@/services/api/index.type';

export type GlobalState = {
  currentSession?: SessionStructType;
  token?: string;
  sessionKey?: string;
  addressDetails?: GenerateMobileWalletConfigsResponse;
  userDetails?: User;
  currentItem?: ItemType;
};

export const initialState: GlobalState = {};

export const globalSlice = createSlice({
  // name used in action type
  name: 'global',
  // defined initial state
  initialState,
  // defined reducer, an object case reducer. key names will be used to generate account
  reducers: {
    setGlobalCredentials: (state, action: PayloadAction<GlobalState>) => {
      const newState = {
        ...state,
        ...action.payload,
      };
      return newState;
    },
    removeGlobalCredentials: () => {
      return initialState;
    },
  },
});
