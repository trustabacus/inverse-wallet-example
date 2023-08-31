import { Modal } from './';
import {
  PairingModalProps,
  SignModalProps,
  WalletModalCtaProps,
  WalletModalHeaderProps,
} from './type';
import { Button } from '../button';
import { TextList } from '../list';
import { View, Image, Text } from '../themed';
import { showToast } from '../toast';

import { Sizing } from '@/constants/sizing';
import { web3wallet } from '@/helpers/wallet';
import {
  approveEIP155Request,
  rejectEIP155Request,
} from '@/helpers/wallet/EIP155Requests';
import { getSignParamsMessage } from '@/helpers/wallet/others';
import { useAppSelector } from '@/hooks';
import { selectGlobalState } from '@/redux/reducers/global';

export const WalletModalHeader = (props: WalletModalHeaderProps) => {
  const { name, url, icon, chains, methods, message, ...rest } = props;

  const iconSize = Sizing[15];

  return (
    <View flexCenterX marginY="base" {...rest}>
      <View
        padding="md"
        overflow="hidden"
        bg="backgroundFaded"
        width={iconSize}
        flexCenter
        height={iconSize}
        borderRadius={Sizing[2]}>
        <Image src={icon} style={{ width: '90%', height: '90%' }} />
      </View>

      <View width="100%" marginTop="base">
        <Text weight="semiBold" align="center">
          {name || '-'}
        </Text>

        <View direction="row" flexCenterY flexCenterX>
          {url ? (
            <Text size="sm" color="textFaded" align="center">
              {url || '-'}
            </Text>
          ) : null}
          {url && chains ? (
            <View marginX="sm">
              <Text>•</Text>
            </View>
          ) : null}
          {chains ? (
            <Text size="sm" color="textFaded" align="center">
              {chains || '-'}
            </Text>
          ) : null}
        </View>
      </View>

      {message ? (
        <View
          width="100%"
          marginY="base"
          padding="base"
          marginBottom="base"
          bg="backgroundFaded"
          borderRadius={Sizing[3]}>
          <Text size="xs">{message}</Text>
        </View>
      ) : null}

      <TextList
        width="100%"
        marginTop="base"
        marginBottom="none"
        title="Methods:"
        data={methods}
      />
    </View>
  );
};

export const WalletModalCta = (props: WalletModalCtaProps) => {
  const { onAccept, onCancel, acceptButtonProps, cancelButtonProps, ...rest } =
    props;

  return (
    <View marginTop="base" {...rest}>
      <View marginBottom="base">
        <Button text="Accept" onPress={onAccept} />
      </View>
      <View marginBottom="base">
        <Button colorScheme="secondary" text="Cancel" onPress={onCancel} />
      </View>
    </View>
  );
};

export const PairingModal = (props: PairingModalProps) => {
  const { currentProposal, handleAccept, handleReject, ...rest } = props;

  const name = currentProposal?.params?.proposer?.metadata?.name;
  const url = currentProposal?.params?.proposer?.metadata.url;
  const icon = currentProposal?.params.proposer.metadata.icons[0];
  const methods = currentProposal?.params?.requiredNamespaces.eip155.methods;
  const events = currentProposal?.params?.requiredNamespaces.eip155.events;
  const chains = currentProposal?.params?.requiredNamespaces.eip155.chains;

  return (
    <Modal
      hideCloseButton
      title="Pair Request"
      footer={
        <WalletModalCta onAccept={handleAccept} onCancel={handleReject} />
      }
      {...rest}>
      <View>
        <WalletModalHeader
          name={name}
          icon={icon}
          url={url}
          chains={chains}
          methods={methods}
        />

        <TextList title="Events:" data={events} />
      </View>
    </Modal>
  );
};

export const SignModal = (props: SignModalProps) => {
  const { requestEvent, requestSession, ...rest } = props;

  const { addressDetails, sessionKey } = useAppSelector(selectGlobalState);

  if (!requestEvent || !requestSession) return null;

  const chainID = requestEvent?.params?.chainId?.toUpperCase();
  const method = requestEvent?.params?.request?.method;
  const message = getSignParamsMessage(requestEvent?.params?.request?.params);

  const requestName = requestSession?.peer?.metadata?.name;
  const requestIcon = requestSession?.peer?.metadata?.icons[0];
  const requestURL = requestSession?.peer?.metadata?.url;

  const { topic } = requestEvent;

  const onApprove = async () => {
    try {
      if (requestEvent) {
        const response = await approveEIP155Request({
          requestEvent,
          addressDetails,
          sessionKey,
        });

        console.log({ response, topic });

        await web3wallet.respondSessionRequest({
          topic,
          response,
        });

        props.onClose?.();
        showToast({ text: 'Approved ✅' });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const onReject = async () => {
    try {
      if (requestEvent) {
        const response = rejectEIP155Request(requestEvent);
        await web3wallet.respondSessionRequest({
          topic,
          response,
        });
      }
    } finally {
      props.onClose?.();
    }
  };

  return (
    <Modal
      hideCloseButton
      title="Sign Request"
      footer={<WalletModalCta onAccept={onApprove} onCancel={onReject} />}
      {...rest}>
      <View>
        <WalletModalHeader
          name={requestName}
          icon={requestIcon}
          url={requestURL}
          chains={chainID}
          methods={method}
          message={message}
        />
      </View>
    </Modal>
  );
};
