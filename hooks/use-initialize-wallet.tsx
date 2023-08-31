import { useState, useCallback, useEffect } from 'react';

import { useAppSelector } from '.';

import { showToast } from '@/components/toast';
import { createWeb3Wallet } from '@/helpers/wallet';
import { selectGlobalState } from '@/redux/reducers/global';

// Initialize the Web3Wallet
export const useInitializeWallet = () => {
  const { addressDetails } = useAppSelector(selectGlobalState);

  const privateKey = addressDetails?.privateKey;

  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);

  const onInitialize = useCallback(async () => {
    try {
      setLoading(true);
      await createWeb3Wallet({
        privateKey: addressDetails?.privateKey,
        aaWallet: addressDetails?.aaWallet,
      });
      setInitialized(true);
      setLoading(false);
    } catch (err: unknown) {
      console.log('Error for initializing', err);
      showToast({ text: 'Error initializing your account', type: 'danger' });
      setLoading(false);
    } finally {
    }
  }, []);

  useEffect(() => {
    if (privateKey) {
      onInitialize();
    }
  }, [privateKey]);

  return {
    initialized,
    loading,
  };
};
