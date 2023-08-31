import { ItemCard } from '@/components/cards';
import { PageHeader } from '@/components/header';
import { MonitorIcon } from '@/components/icons';
import { InfoList } from '@/components/list';
import { LoadingModal } from '@/components/modal';
import { View } from '@/components/themed';
import { Container } from '@/components/themed/container';
import { Sizing } from '@/constants/sizing';
import { useAppSelector } from '@/hooks';
import { selectGlobalState } from '@/redux/reducers/global';
import { useFetchClaimedItemsQuery } from '@/services/api';

const ItemsScreen = () => {
  const { addressDetails } = useAppSelector(selectGlobalState);

  const { data: _data, isLoading } = useFetchClaimedItemsQuery(
    { address: addressDetails?.aaWallet || '' },
    {
      skip: !addressDetails?.aaWallet,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const data = _data;

  const loading = isLoading;

  const dataEmpty = !loading && (data?.length === 0 || !data);

  const isLoggedIn = !!addressDetails;

  const renderChildren = () => {
    if (dataEmpty || !isLoggedIn) {
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
          title={isLoggedIn ? 'No Claimed Items' : 'Empty Zone'}
          description={
            !isLoggedIn
              ? 'You need to login to your account first, then try checking again.'
              : "All the items you've claimed on your account will be visible here."
          }
        />
      );
    }

    return (
      <View>
        {data?.map((item, index) => {
          return (
            <View marginBottom="base" key={`item-${index}`}>
              <ItemCard {...item} />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <Container scrollable>
      <PageHeader title="Items" />

      <View paddingTop="xl">{renderChildren()}</View>

      <LoadingModal loading={loading} />
    </Container>
  );
};

export default ItemsScreen;
