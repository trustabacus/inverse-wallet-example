import { utils } from 'ethers';

/**
 * Converts hex to utf8 string if it is valid bytes
 */
export const convertHexToUtf8 = (value: string) => {
  if (utils.isHexString(value)) {
    return utils.toUtf8String(value);
  }

  return value;
};

/**
 * Gets message from various signing request methods by filtering out
 * a value that is not an address (thus is a message).
 * If it is a hex string, it gets converted to utf8 string
 */
export const getSignParamsMessage = (params: string[]) => {
  const message = params.filter((p) => !utils.isAddress(p))[0];

  return convertHexToUtf8(message);
};

/**
 * Gets data from various signTypedData request methods by filtering out
 * a value that is not an address (thus is data).
 * If data is a string convert it to object
 */
export const getSignTypedDataParamsData = (params: string[]) => {
  const data = params.filter((p) => !utils.isAddress(p))[0];

  if (typeof data === 'string') {
    return JSON.parse(data);
  }

  return data;
};

/**
 * Get our address from params checking if params string contains one
 * of our wallet addresses
 */
export const getWalletAddressFromParams = (
  addresses: string[],
  params: any
) => {
  const paramsString = JSON.stringify(params);
  let address = '';

  addresses.forEach((addr) => {
    if (paramsString.toLowerCase().includes(addr.toLowerCase())) {
      address = addr;
    }
  });

  return address;
};
