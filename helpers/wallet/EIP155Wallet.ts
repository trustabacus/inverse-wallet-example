import AsyncStorage from '@react-native-async-storage/async-storage';

import EIP155Lib from './EIP155Lib';

import type { AddressDetailsType } from '@/services/api/index.type';

export let wallet1: EIP155Lib;
export let wallet2: EIP155Lib;
export let eip155Wallets: Record<string, EIP155Lib>;
export let eip155Addresses: string[];

export let address1: string;
let address2: string;

const StorageKeys = {
  MNEMONIC: 'EIP155_MNEMONIC_1',
  PRIVATEKEY: 'EIP155_PRIVATEKEY_1',
};

/**
 * Utilities
 */
export const setLocalStorage = async (
  keyValue: any,
  key = StorageKeys.MNEMONIC
) => {
  try {
    const value = await AsyncStorage.setItem(key, keyValue);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log('setLocalStorage Error:', e);
  }
};

export const getLocalStorage = async (key = StorageKeys.MNEMONIC) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log('getLocalStorage Error:', e);
  }
};

type CreateOrRestoreEIP155WalletOptions = Partial<AddressDetailsType> | void;

// Function to create or restore a wallet
export const createOrRestoreEIP155Wallet = async (
  options: CreateOrRestoreEIP155WalletOptions
) => {
  const mnemonic1 = await getLocalStorage();
  const storedPrivateKey = await getLocalStorage(StorageKeys.PRIVATEKEY);

  const privateKey =
    options && options?.privateKey
      ? options?.privateKey
      : storedPrivateKey || undefined;

  if (privateKey) {
    wallet1 = await EIP155Lib.init({
      addressDetails: {
        privateKey,
        aaWallet: options?.aaWallet || '',
        publicKey: options?.publicKey || '',
      },
    });
  } else if (mnemonic1) {
    wallet1 = await EIP155Lib.init({ mnemonic: mnemonic1 });
  } else {
    wallet1 = await EIP155Lib.init({});
  }

  // @notice / Warning!!! : This is a test wallet, do not use it for real transactions
  if (!privateKey) {
    setLocalStorage(wallet1?.getMnemonic());
  }

  address1 = await wallet1.getAddress();

  eip155Wallets = {
    [address1]: wallet1,
    [address2]: wallet2,
  };
  eip155Addresses = Object.keys(eip155Wallets);

  return {
    eip155Wallets,
    eip155Addresses,
  };
};
