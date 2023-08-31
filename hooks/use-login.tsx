import { parse } from 'expo-linking';
import { useEffect } from 'react';

import { useAppDispatch } from '.';

import { showToast } from '@/components/toast';
import { setGlobalCredentials } from '@/redux/reducers/global';
import {
  useGenerateMobileWalletConfigsMutation,
  useLazyGetCreatorDetailsQuery,
} from '@/services/api';

export type UseLoginAuthOptions = {
  onCompleted?: () => void;
  url?: string;
};

export const useLoginAuth = (options: UseLoginAuthOptions) => {
  const { onCompleted, url } = options;

  const dispatch = useAppDispatch();

  const [generateWallet, { isLoading }] =
    useGenerateMobileWalletConfigsMutation();

  const [getCreatorDetails, { isLoading: isCreatorLoading }] =
    useLazyGetCreatorDetailsQuery();

  const loading = isLoading || isCreatorLoading;

  const onAuthHandler = async () => {
    if (url) {
      const { queryParams } = parse(url);

      const token = (queryParams?.token as string) || '';

      const sessionKey = (queryParams?.session as string) || '';

      try {
        dispatch(setGlobalCredentials({ token, sessionKey }));

        const userDetails = await getCreatorDetails().unwrap();

        const addressDetails = await generateWallet().unwrap();

        dispatch(
          setGlobalCredentials({
            addressDetails: {
              ...addressDetails,
            },
            userDetails,
          })
        );

        showToast({ text: 'You`ve logged in successfully' });

        onCompleted?.();
      } catch (error) {
        console.log({ error });
        showToast({ text: 'Something went wrong, try again', type: 'danger' });
      }
    }
  };

  useEffect(() => {
    onAuthHandler();
  }, [url]);

  return { loading };
};
