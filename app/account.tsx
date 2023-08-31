import { AccountCard } from '@/components/cards';
import { PageHeader } from '@/components/header';
import { MonitorIcon } from '@/components/icons';
import { InfoList } from '@/components/list';
import { View } from '@/components/themed';
import { Container } from '@/components/themed/container';
import { Sizing } from '@/constants/sizing';
import { currentETHAddress } from '@/helpers/wallet';

const AccountScreen = () => {
  const addresses = currentETHAddress ? [currentETHAddress] : [];

  const renderChildren = () => {
    if (!addresses || addresses.length === 0) {
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
          description="You need to login to your account first, then try checking again."
        />
      );
    }

    return (
      <View>
        {addresses.map((address, index) => {
          if (!address || address === 'undefined') {
            return null;
          }

          return (
            <View marginBottom="base" key={`address-${index}`}>
              <AccountCard address={address} />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <Container scrollable>
      <PageHeader title="Account" />

      <View paddingTop="xl">{renderChildren()}</View>
    </Container>
  );
};

export default AccountScreen;
