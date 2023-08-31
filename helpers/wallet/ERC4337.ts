import { formatJsonRpcResult } from '@json-rpc-tools/utils';
import { SignClientTypes } from '@walletconnect/types';
import { getZeroDevSigner } from '@zerodevapp/sdk';
import { utils, Contract, providers } from 'ethers';

import { currentETHAddress } from '.';
import { EIP155_CHAINS, TEIP155Chain } from './EIP155Lib';
import { wallet1 } from './EIP155Wallet';
import { getSignParamsMessage } from './others';

import { AddressDetailsType } from '@/services/api/index.type';

const walletABI = [
  'function isValidSignature(bytes32 _message, bytes _signature) public view returns (bool)',
];

export const verifySignatureRequest = async (
  requestEvent: SignClientTypes.EventArguments['session_request']
) => {
  const { id, params } = requestEvent;

  const { chainId, request } = params;

  const message = getSignParamsMessage(request.params);

  const provider = new providers.JsonRpcProvider(
    EIP155_CHAINS[chainId as TEIP155Chain].rpc
  );

  console.log({ currentETHAddress });

  const wallet = new Contract(currentETHAddress, walletABI, provider);

  const hash = utils.hashMessage(message);

  const returnValue = await wallet.isValidSignature(hash);

  console.log({ requestEvent, hash, returnValue, currentETHAddress });

  return formatJsonRpcResult(id, hash);
};

type GetAddressSignerOptions = {
  addressDetails?: AddressDetailsType;
  sessionKey?: string;
};

export const getAddressSigner = async (options: GetAddressSignerOptions) => {
  const { addressDetails } = options;

  const signer = await getZeroDevSigner({
    projectId: process.env.ZERODEV_PROJECT_ID || '',
    address: addressDetails?.aaWallet,
    owner: wallet1 as any,
  });

  const zeroDevAddress = await signer.getAddress();

  console.log({ zeroDevAddress, addressDetails });

  return signer;
};
