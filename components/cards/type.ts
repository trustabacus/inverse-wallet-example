import type { SessionTypes } from '@walletconnect/types';

import { ViewProps } from '../themed/type';

import { SessionStructType, SessionsTypeRequest } from '@/helpers/wallet/type';
import { ItemType } from '@/services/api/index.type';

export interface SessionCardProps extends SessionStructType {
  onPress?: () => void;
}

export interface SessionCardListProps extends ViewProps {
  sessions: SessionsTypeRequest;
}

export interface SessionInfoCardProps {
  session: SessionStructType;
}

export interface SessionChainCardProps {
  namespace: SessionTypes.Namespace;
  title?: string;
}

export interface AccountCardProps {
  address: string;
  title?: string;
}

export interface ItemCardProps extends ItemType {}
