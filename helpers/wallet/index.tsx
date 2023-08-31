import '@walletconnect/react-native-compat';
import '@ethersproject/shims';

import { Core } from '@walletconnect/core';
import { ICore } from '@walletconnect/types';
import { Web3Wallet, IWeb3Wallet } from '@walletconnect/web3wallet';

import { createOrRestoreEIP155Wallet } from './EIP155Wallet';

import { AddressDetailsType } from '@/services/api/index.type';

export let web3wallet: IWeb3Wallet;
export let core: ICore;

export let currentETHAddress: string;

type CreateWeb3WalletOption = Partial<AddressDetailsType>;

export const createWeb3Wallet = async (options: CreateWeb3WalletOption) => {
  const { privateKey, aaWallet } = options;

  // Here we create / restore an EIP155 wallet
  const { eip155Addresses } = await createOrRestoreEIP155Wallet({
    privateKey,
    aaWallet,
  });

  currentETHAddress = eip155Addresses[0];

  console.log({ aaWallet, currentETHAddress });

  core = new Core({
    // @notice: If you want the debugger / logs
    // logger: 'debug',
    projectId: process.env.WC_PROJECT_ID,
  });

  web3wallet = await Web3Wallet.init({
    core,
    metadata: {
      name: 'Inverse Wallet',
      description: 'ReactNative Web3Wallet',
      url: 'https://www.inverse.wtf/',
      icons: [
        'https://res.cloudinary.com/getabacus/image/upload/v1690915394/inverse/icon/logo_fd7jcr.svg',
      ],
    },
  });
};

export const pairWallet = async (params: { uri: string }) => {
  return await core?.pairing?.pair({ uri: params.uri });
};
