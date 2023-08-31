import type { SignClientTypes } from '@walletconnect/types';
import type { ModalProps as DefaultModalProps, ViewStyle } from 'react-native';

import { ButtonProps } from '../button/type';
import { ViewProps } from '../themed/type';

export type ModalPositionType = 'top' | 'center' | 'bottom';

export type ModalPositionOptionsData = {
  [key in ModalPositionType]: ViewStyle['justifyContent'];
};

export interface ModalProps extends DefaultModalProps {
  onClose?: () => void;
  closeOnOverlayClick?: boolean;
  title?: string;
  hideCloseButton?: boolean;
  showCloseIcon?: boolean;
  minHeight?: ViewStyle['minHeight'];
  footer?: React.ReactNode;
  contentProps?: ViewProps;
  position?: ModalPositionType;
}

export interface PairingModalProps extends ModalProps {
  currentProposal:
    | SignClientTypes.EventArguments['session_proposal']
    | undefined;
  handleAccept: () => void;
  handleReject: () => void;
}

export interface SignModalProps extends ModalProps {
  requestSession: any;
  requestEvent: SignClientTypes.EventArguments['session_request'] | undefined;
}

export interface LoadingModalProps extends ModalProps {
  loading?: boolean;
}

export interface WalletModalHeaderProps extends ViewProps {
  name?: string;
  url?: string;
  icon?: string;
  message?: string;
  chains?: string | string[];
  methods?: string | string[];
}

export interface WalletModalCtaProps extends ViewProps {
  onAccept?: () => void;
  onCancel?: () => void;
  acceptButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}
