import { useState } from 'react';

import { SessionCardList } from '@/components/cards';
import { PageHeader } from '@/components/header';
import { MonitorIcon } from '@/components/icons';
import { InfoList } from '@/components/list';
import { View } from '@/components/themed';
import { Container } from '@/components/themed/container';
import { Sizing } from '@/constants/sizing';
import { web3wallet } from '@/helpers/wallet';
import { SessionsTypeRequest } from '@/helpers/wallet/type';
import { useAppSelector } from '@/hooks';
import { usePageFocused } from '@/hooks/use-page-focus';
import { selectGlobalState } from '@/redux/reducers/global';

const ActivitiesScreen = () => {
  const { addressDetails } = useAppSelector(selectGlobalState);

  const [sessions, setSessions] = useState<SessionsTypeRequest>({});

  const sessionsExists = Object.values(sessions).length > 0;

  const getAllSessions = async () => {
    if (!web3wallet) {
      return;
    }

    const activeSessions = await web3wallet?.getActiveSessions?.();
    setSessions(activeSessions);
  };

  usePageFocused(() => {
    getAllSessions();
  });

  const renderChildren = () => {
    if (sessionsExists) {
      return <SessionCardList sessions={sessions} />;
    }

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
        title={!addressDetails?.privateKey ? 'Empty Zone' : 'No Activity found'}
        description={
          !addressDetails?.privateKey
            ? 'You need to login to your account first, then try checking again.'
            : "There isn't any activities on your account yet."
        }
      />
    );
  };

  return (
    <Container scrollable>
      <PageHeader title="Activities" />

      <View paddingTop="xl">{renderChildren()}</View>
    </Container>
  );
};

export default ActivitiesScreen;
