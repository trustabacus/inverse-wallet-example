import type { SignClientTypes, SessionTypes } from '@walletconnect/types';
import { getSdkError } from '@walletconnect/utils';
import { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from '.';

import { showToast } from '@/components/toast';
import { currentETHAddress, pairWallet, web3wallet } from '@/helpers/wallet';
import { EIP155_SIGNING_METHODS } from '@/helpers/wallet/EIP155Lib';
import { selectGlobalState } from '@/redux/reducers/global';

type useWalletOptions = void;

export const useWallet = (options: useWalletOptions) => {
  const { addressDetails } = useAppSelector(selectGlobalState);

  const [showPairModal, setShowPairModal] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const [successfulSession, setSuccessfulSession] = useState(false);

  const [loading, setLoading] = useState(false);

  const [currentWCURI, setCurrentWCURI] = useState('');
  const [currentProposal, setCurrentProposal] = useState<any>(undefined);

  const [requestSession, setRequestSession] = useState<any>(undefined);
  const [requestEventData, setRequestEventData] = useState<
    SignClientTypes.EventArguments['session_request'] | undefined
  >(undefined);

  const hidePairModalHandler = () => {
    setShowPairModal(false);
  };

  const hideSignModalHandler = () => {
    setShowSignModal(false);
  };

  const pairHandler = async (uri: string) => {
    if (!addressDetails?.privateKey) {
      showToast({ text: 'Sign in to your account first', type: 'danger' });
      return;
    }

    if (!uri) {
      showToast({ text: 'Please enter the uri', type: 'danger' });
      return;
    }

    setCurrentWCURI(uri);
    setLoading(true);

    try {
      const pairing = await pairWallet({ uri });

      return pairing;
    } catch (error) {
      showToast({ text: `Something went wrong, ${error}`, type: 'danger' });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const onSessionProposal = useCallback(
    (proposal: SignClientTypes.EventArguments['session_proposal']) => {
      if (proposal) {
        setShowPairModal(true);
        setCurrentProposal(proposal);
      }
    },
    []
  );

  const handleAccept = async () => {
    const { id, params } = currentProposal;
    const { requiredNamespaces, relays } = params;

    try {
      if (currentProposal) {
        const namespaces: SessionTypes.Namespaces = {};
        Object.keys(requiredNamespaces).forEach((key) => {
          const accounts: string[] = [];
          requiredNamespaces[key].chains.map((chain: any) => {
            [currentETHAddress].map((acc) => accounts.push(`${chain}:${acc}`));
          });

          namespaces[key] = {
            accounts,
            methods: requiredNamespaces[key].methods,
            events: requiredNamespaces[key].events,
          };
        });

        await web3wallet.approveSession({
          id,
          relayProtocol: relays[0].protocol,
          namespaces,
        });

        hidePairModalHandler();
        setCurrentWCURI('');
        setCurrentProposal(undefined);
        setSuccessfulSession(true);

        showToast({ text: 'Approved ✅' });
      }
    } catch (error) {
      showToast({ text: `Something went wrong, ${error}`, type: 'danger' });
    }
  };

  const handleReject = async () => {
    try {
      if (currentProposal) {
        const { id } = currentProposal;

        await web3wallet.rejectSession({
          id,
          reason: getSdkError('USER_REJECTED_METHODS'),
        });

        setCurrentWCURI('');
        setCurrentProposal(undefined);
      }
    } catch (error) {
      showToast({ text: `Something went wrong, ${error}`, type: 'danger' });
    } finally {
      hidePairModalHandler();
    }
  };

  const onSessionRequest = useCallback(
    async (requestEvent: SignClientTypes.EventArguments['session_request']) => {
      const { topic, params } = requestEvent;
      const { request } = params;
      const requestSessionData =
        web3wallet.engine.signClient.session.get(topic);

      switch (request.method) {
        case EIP155_SIGNING_METHODS.ETH_SIGN:
        case EIP155_SIGNING_METHODS.PERSONAL_SIGN:
          setRequestSession(requestSessionData);
          setRequestEventData(requestEvent);
          setShowSignModal(true);
      }
    },
    []
  );

  useEffect(() => {
    web3wallet?.on('session_proposal', onSessionProposal);
    web3wallet?.on('session_request', onSessionRequest);
  }, [
    pairHandler,
    handleAccept,
    handleReject,
    currentETHAddress,
    onSessionRequest,
    onSessionProposal,
    successfulSession,
  ]);

  return {
    pairHandler,
    hidePairModalHandler,
    hideSignModalHandler,
    handleAccept,
    handleReject,
    loading,
    showPairModal,
    showSignModal,
    currentWCURI,
    currentProposal,
    requestSession,
    requestEventData,
    successfulSession,
  };
};
