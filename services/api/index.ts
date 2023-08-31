import { createApi } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';

import { ItemFragments } from './fragments';
import type {
  CreatorDetailsType,
  FetchClaimedItemsRequest,
  GenerateMobileWalletConfigsResponse,
  ItemType,
} from './index.type';
import { gqlRequestBaseQuery } from '../gql';

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: gqlRequestBaseQuery(),
  endpoints: (builder) => ({
    getCreatorDetails: builder.query<CreatorDetailsType, void>({
      query: (input) => ({
        document: gql`
          query GetCreatorDetails {
            getCreatorDetails {
              inverseUsername
              creatorID
              address
            }
          }
        `,
        variables: { input },
      }),
      transformResponse: (response: any) => response.getCreatorDetails,
    }),
    generateMobileWalletConfigs: builder.mutation<
      GenerateMobileWalletConfigsResponse,
      void
    >({
      query: () => ({
        document: gql`
          mutation GenerateMobileWalletConfigs {
            generateMobileWalletConfigs {
              publicKey
              privateKey
              aaWallet
            }
          }
        `,
      }),
      transformResponse: (response: any) =>
        response.generateMobileWalletConfigs,
    }),

    fetchClaimedItems: builder.query<ItemType[], FetchClaimedItemsRequest>({
      query: (input) => ({
        document: gql`
          ${ItemFragments}
          query FetchClaimedItems($address: String!) {
            fetchClaimedItems(address: $address) {
              ...Item
            }
          }
        `,
        variables: { ...input },
      }),
      transformResponse: (response: any) => response.fetchClaimedItems,
    }),
  }),
});

export const {
  useLazyGetCreatorDetailsQuery,
  useGetCreatorDetailsQuery,
  useGenerateMobileWalletConfigsMutation,
  useFetchClaimedItemsQuery,
} = apiSlice;
