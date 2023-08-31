import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer, PersistConfig } from 'redux-persist';

import globalReducer from './global';

import { apiSlice } from '@/services/api';

export const reducers = combineReducers({
  global: globalReducer,

  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['global'],
};

export const rootReducer = persistReducer(persistConfig, reducers);
