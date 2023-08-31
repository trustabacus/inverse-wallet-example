import type { SessionTypes } from '@walletconnect/types';

export type SessionStructType = SessionTypes.Struct;

export type SessionsTypeRequest = Record<string, SessionStructType>;
