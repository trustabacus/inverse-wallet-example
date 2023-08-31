import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';

import { Button } from '@/components/button';
import { UserDetailsCard } from '@/components/cards';
import { PageHeader } from '@/components/header';
import { Input } from '@/components/input';
import { LoadingModal, LoginModal } from '@/components/modal';
import { PairingModal, SignModal } from '@/components/modal/wallet';
import { QRCodeScanner } from '@/components/qr-code';
import { Text, View } from '@/components/themed';
import { Container } from '@/components/themed/container';
import { InverseLoginAuthUrl } from '@/constants';
import Layout from '@/constants/layout';
import { useAppSelector } from '@/hooks';
import { useInitializeWallet } from '@/hooks/use-initialize-wallet';
import { useLoginAuth } from '@/hooks/use-login';
import { useWallet } from '@/hooks/use-wallet';
import { selectGlobalState } from '@/redux/reducers/global';

const ConnectScreen = () => {
  const { loading: initializing } = useInitializeWallet();

  const { addressDetails } = useAppSelector(selectGlobalState);

  const isLoggedIn = addressDetails?.privateKey;

  const [url, setUrl] = useState('');

  const {
    loading,
    pairHandler,
    handleAccept,
    handleReject,
    showPairModal,
    hidePairModalHandler,
    showSignModal,
    hideSignModalHandler,
    currentProposal,
    requestEventData,
    requestSession,
  } = useWallet();

  const { loading: isLoginLoading } = useLoginAuth({ url });

  const [value, setValue] = useState('');

  const [showLoginModal, setShowLoginModal] = useState(false);

  const onLoginHandler = async () => {
    const result = await WebBrowser.openAuthSessionAsync(InverseLoginAuthUrl);

    const url = 'url' in result ? result?.url : '';

    setUrl(url);
  };

  const renderModal = () => {
    if (showPairModal) {
      return (
        <PairingModal
          handleAccept={handleAccept}
          handleReject={handleReject}
          visible
          onClose={hidePairModalHandler}
          currentProposal={currentProposal}
        />
      );
    }

    if (showSignModal) {
      return (
        <SignModal
          visible
          onClose={hideSignModalHandler}
          requestEvent={requestEventData}
          requestSession={requestSession}
        />
      );
    }

    if (showLoginModal) {
      return <LoginModal visible onClose={() => setShowLoginModal(false)} />;
    }

    return <LoadingModal loading={loading || initializing || isLoginLoading} />;
  };

  return (
    <Container scrollable>
      <PageHeader title="Connect" />

      {isLoggedIn ? (
        <View marginTop="base">
          <UserDetailsCard />
        </View>
      ) : null}

      <View paddingY={isLoggedIn ? 'md' : 'lg'}>
        <View marginTop="lg">
          <QRCodeScanner
            onData={(res) => {
              pairHandler(res.data);
            }}
          />
        </View>

        <View paddingY="xl">
          <Text align="center" color="textFaded" size="lg" weight="semiBold">
            OR
          </Text>
        </View>
        <View marginBottom="lg">
          <Input
            value={value}
            onChangeText={setValue}
            placeholder="WalletConnect uri e.g wc:abc..."
          />
        </View>
        <Button text="Connect" onPress={() => pairHandler(value)} />

        {isLoggedIn ? null : (
          <View
            paddingY={Layout.isSmallDevice ? 'lg' : 'xl'}
            marginTop={Layout.isSmallDevice ? 'lg' : 'xl'}
            borderTop={1}>
            <Button
              text="Login Into Inverse"
              colorScheme="secondary"
              onPress={onLoginHandler}
            />
          </View>
        )}
      </View>

      {renderModal()}
    </Container>
  );
};

export default ConnectScreen;
