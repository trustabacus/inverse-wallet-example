import type { SessionTypes } from '@walletconnect/types';
import { router, useRouter } from 'expo-router';
import { Pressable } from 'react-native';

import {
  AccountCardProps,
  ItemCardProps,
  SessionCardListProps,
  SessionCardProps,
  SessionChainCardProps,
  SessionInfoCardProps,
} from './type';
import { CopyButton, LogoutButton } from '../button';
import { ChevronRightIcon, WalletIcon } from '../icons';
import { TextList, TextRowList } from '../list';
import { View, Image, Text } from '../themed';

import { Sizing } from '@/constants/sizing';
import { prefixCreatorUsername, truncateAddress } from '@/helpers/base';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  selectGlobalState,
  setGlobalCredentials,
} from '@/redux/reducers/global';

export const SessionCard = (props: SessionCardProps) => {
  const dispatch = useAppDispatch();

  const { onPress, ...session } = props;

  const { name, icons, url } = session.peer.metadata;

  const icon = icons?.[0];

  const iconSize = Sizing[15];

  const onPressHandler = () => {
    onPress?.();
    dispatch(
      setGlobalCredentials({
        currentSession: session,
      })
    );
    router.push('/session');
  };

  return (
    <Pressable onPress={onPressHandler}>
      <View
        flexCenterX
        direction="row"
        border={1}
        paddingY="base"
        paddingX="base"
        borderRadius={Sizing[2]}>
        <View
          marginRight="base"
          padding="md"
          overflow="hidden"
          bg="backgroundFaded"
          width={iconSize}
          flexCenter
          height={iconSize}
          borderRadius={Sizing[2]}>
          <Image src={icon} style={{ width: '90%', height: '90%' }} />
        </View>

        <View flex={1}>
          <Text weight="semiBold">{name || '-'}</Text>
          <Text size="sm" color="textFaded">
            {url || '-'}
          </Text>
        </View>

        <View>
          <ChevronRightIcon />
        </View>
      </View>
    </Pressable>
  );
};

export const SessionCardList = (props: SessionCardListProps) => {
  const { sessions, ...rest } = props;

  const data = Object.values(sessions);

  if (!data || !data.length) {
    return null;
  }

  return (
    <View {...rest}>
      {data.map((session, index) => {
        return (
          <View marginBottom="base" key={`item-${index}`}>
            <SessionCard {...session} />
          </View>
        );
      })}
    </View>
  );
};

export const SessionChainCard = (props: SessionChainCardProps) => {
  const { namespace, title } = props;

  const chains: string[] = [];

  namespace.accounts.forEach((account) => {
    const [type, chain] = account.split(':');
    const chainId = `${type}:${chain}`;
    chains.push(chainId);
  });

  return (
    <View>
      {title ? <Text weight="semiBold">{title}</Text> : null}

      {chains.map((chainId, index) => {
        const extensionMethods: SessionTypes.Namespace['methods'] = [];
        const extensionEvents: SessionTypes.Namespace['events'] = [];
        const allMethods = [...namespace.methods, ...extensionMethods];
        const allEvents = [...namespace.events, ...extensionEvents];

        return (
          <View
            key={`item-${index}`}
            width="100%"
            marginTop="base"
            padding="base"
            bg="backgroundFaded"
            borderRadius={Sizing[2]}>
            <TextList
              width="100%"
              marginBottom="base"
              title="Methods:"
              data={allMethods}
            />

            <TextList
              width="100%"
              marginBottom="base"
              title="Events:"
              data={allEvents}
            />
          </View>
        );
      })}
    </View>
  );
};

export const SessionInfoCard = (props: SessionInfoCardProps) => {
  const { session, ...rest } = props;

  const { peer, namespaces } = session;

  const namespacesData = Object.keys(namespaces);

  const { name, icons, url } = peer.metadata;

  const expiryDate = new Date(session.expiry * 1000);

  const icon = icons?.[0];

  const iconSize = Sizing[15];

  if (!session) {
    return null;
  }

  return (
    <View {...rest}>
      <View
        padding="md"
        overflow="hidden"
        bg="backgroundFaded"
        width={iconSize}
        flexCenter
        alignSelf="center"
        height={iconSize}
        borderRadius={Sizing[2]}>
        <Image src={icon} style={{ width: '90%', height: '90%' }} />
      </View>

      <View marginY="base" paddingBottom="base" borderBottom={1}>
        <Text weight="semiBold" align="center">
          {name || '-'}
        </Text>
        <Text size="sm" color="textFaded" align="center">
          {url || '-'}
        </Text>
      </View>

      <View marginY="base">
        {namespacesData.length
          ? namespacesData.map((chain, index) => {
              return (
                <SessionChainCard
                  key={`namespace-${index}`}
                  title={`Review ${chain} permissions`}
                  namespace={namespaces[chain]}
                />
              );
            })
          : null}
      </View>

      <TextRowList title="Expiry Date:" data={expiryDate.toDateString()} />
    </View>
  );
};

export const AccountCard = (props: AccountCardProps) => {
  const { address, title = 'Address' } = props;

  const iconSize = Sizing[15];

  if (!address) {
    return null;
  }

  return (
    <View
      flexCenterX
      direction="row"
      border={1}
      paddingY="base"
      paddingX="base"
      borderRadius={Sizing[2]}>
      <View
        marginRight="base"
        padding="md"
        overflow="hidden"
        bg="backgroundFaded"
        width={iconSize}
        flexCenter
        height={iconSize}
        borderRadius={Sizing[2]}>
        <WalletIcon />
      </View>

      <View flex={1}>
        <Text weight="semiBold">{title || '-'}</Text>
        <Text size="sm" color="textFaded">
          {truncateAddress(address, 19)}
        </Text>
      </View>

      <CopyButton size={Sizing[10]} colorScheme="secondary" value={address} />
    </View>
  );
};

export const ItemCard = (props: ItemCardProps) => {
  const { name, creator, image } = props;

  const dispatch = useAppDispatch();

  const router = useRouter();

  const iconSize = Sizing[15];

  const onPressHandler = () => {
    dispatch(setGlobalCredentials({ currentItem: props }));
    router.push('/item');
  };

  return (
    <Pressable onPress={onPressHandler}>
      <View
        flexCenterX
        direction="row"
        border={1}
        paddingY="base"
        paddingX="base"
        borderRadius={Sizing[3]}>
        <View
          marginRight="base"
          overflow="hidden"
          bg="backgroundFaded"
          width={iconSize}
          flexCenter
          height={iconSize}
          borderRadius={Sizing[2]}>
          <Image src={image} style={{ width: '100%', height: '100%' }} />
        </View>

        <View flex={1} paddingRight="md">
          <Text numberOfLines={1} weight="semiBold">
            {name || '-'}
          </Text>
          <Text size="xs" color="textFaded">
            creator: {creator.inverseUsername}
          </Text>
        </View>

        <View>
          <ChevronRightIcon />
        </View>
      </View>
    </Pressable>
  );
};

export const UserDetailsCard = () => {
  const { userDetails } = useAppSelector(selectGlobalState);

  return (
    <View
      direction="row"
      bg="backgroundFaded"
      padding="base"
      border={1}
      borderRadius={Sizing[3]}>
      <View flex={1}>
        <Text size="xs" color="textFaded">
          You are currently sign in as{' '}
        </Text>

        <View marginTop="sm">
          <Text size="xs" transform="lowercase" color="primary">
            {prefixCreatorUsername(userDetails?.inverseUsername)}
          </Text>
        </View>
      </View>

      <View>
        <LogoutButton size="sm" type="inline" />
      </View>
    </View>
  );
};
