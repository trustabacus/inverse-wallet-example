import { getSdkError } from '@walletconnect/utils';
import { router } from 'expo-router';
import { useState } from 'react';

import { Button } from '@/components/button';
import { SessionInfoCard } from '@/components/cards';
import { PageHeader } from '@/components/header';
import { MonitorIcon } from '@/components/icons';
import { InfoList } from '@/components/list';
import { LoadingModal } from '@/components/modal';
import { ScrollView, View } from '@/components/themed';
import { Container } from '@/components/themed/container';
import { Sizing } from '@/constants/sizing';
import { web3wallet } from '@/helpers/wallet';
import { useAppSelector } from '@/hooks';
import { selectGlobalState } from '@/redux/reducers/global';

const SessionScreen = () => {
  const { currentSession } = useAppSelector(selectGlobalState);

  const [loading, setLoading] = useState(false);

  const onDeleteHandler = async () => {
    if (!currentSession) {
      return;
    }

    try {
      setLoading(true);
      await web3wallet.disconnectSession({
        topic: currentSession?.topic || '',
        reason: getSdkError('USER_DISCONNECTED'),
      });
      router.push('/activities');
    } finally {
      setLoading(false);
    }
    // ..
  };

  const renderChildren = () => {
    if (!currentSession) {
      return (
        <InfoList
          icon={
            <View
              flexCenter
              bg="backgroundFaded"
              borderRadius={Sizing[3]}
              size={Sizing[24]}>
              <MonitorIcon size="xxl" />
            </View>
          }
          paddingX="xl"
          paddingTop="xxl"
          marginTop="xxxl"
          title="No Records found"
          description="We couldn't find any details about this activity. please try again."
        />
      );
    }

    return (
      <View flex={1}>
        <View flex={1}>
          <ScrollView flex={1}>
            <SessionInfoCard session={currentSession} />
          </ScrollView>
        </View>

        <View paddingBottom="xl">
          <Button
            text="Delete"
            colorScheme="danger"
            onPress={onDeleteHandler}
          />
        </View>
      </View>
    );
  };

  return (
    <Container>
      <PageHeader showBackIcon title="Activity" />

      <View paddingTop="xl" flex={1}>
        {renderChildren()}
      </View>

      <LoadingModal loading={loading} />
    </Container>
  );
};

export default SessionScreen;
