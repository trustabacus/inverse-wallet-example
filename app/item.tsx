import * as WebBrowser from 'expo-web-browser';

import { Button } from '@/components/button';
import { PageHeader } from '@/components/header';
import { MonitorIcon } from '@/components/icons';
import { InfoList, TextRowList } from '@/components/list';
import { View, Text, Image } from '@/components/themed';
import { Container } from '@/components/themed/container';
import { Sizing } from '@/constants/sizing';
import { abstractCriteriaHandler, prefixCreatorUsername } from '@/helpers/base';
import { useAppSelector } from '@/hooks';
import { selectGlobalState } from '@/redux/reducers/global';

const AccountScreen = () => {
  const { currentItem, token } = useAppSelector(selectGlobalState);

  const onClaimLink = async () => {
    const url = `https://www.inverse.wtf/claim/${currentItem?.ID || ''}`;

    await WebBrowser.openBrowserAsync(url);
  };

  const renderChildren = () => {
    if (!currentItem || !token) {
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
          title="Empty Zone"
          description={
            !currentItem
              ? "We couldn't get the item details"
              : 'You need to login to your account first, then try checking again.'
          }
        />
      );
    }

    return (
      <View>
        <Image
          src={currentItem.image}
          style={{ width: '100%', height: 250 }}
          borderRadius={Sizing[3]}
        />

        <View marginY="base">
          <Text lineHeight={Sizing[6.5]} size="sm" color="textFaded">
            {currentItem.description}
          </Text>
        </View>

        <View marginBottom="xl">
          <TextRowList
            title="Creator:"
            data={prefixCreatorUsername(currentItem.creator?.inverseUsername)}
          />
          <TextRowList
            title="Criteria:"
            data={abstractCriteriaHandler(currentItem.claimCriteria)}
          />
          <TextRowList
            title="Created At:"
            data={new Date(currentItem.createdAt as any).toDateString()}
          />
        </View>

        <Button text="View Claim Link" onPress={onClaimLink} />
      </View>
    );
  };

  return (
    <Container scrollable>
      <PageHeader showBackIcon title={currentItem?.name || 'Item'} />

      <View paddingTop="xl">{renderChildren()}</View>
    </Container>
  );
};

export default AccountScreen;
