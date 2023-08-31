import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { DocumentNode } from 'graphql';
import { GraphQLClient, ClientError } from 'graphql-request';

import type {
  ErrorResponse,
  GraphqlRequestBaseQueryArgs,
  PrepareHeaders,
  RequestHeaders,
} from './type';

import {
  stripRequestUndefined,
  getAPIRequest,
  isPublicEndpoint,
  formatErrorMessage,
} from '@/helpers/api';
import type { RootState } from '@/redux/store';

/**
 * This is the base graphql request to use for every endpoint depending on it type
 * @param props: BaseQuery
 * @returns request
 * @todo Update to support authenticated request.
 */

export const gqlRequestBaseQuery = <E = ErrorResponse>(
  defaultOptions?: GraphqlRequestBaseQueryArgs<E>
): BaseQueryFn<
  { document: string | DocumentNode; variables?: any },
  unknown,
  E,
  Partial<Pick<ClientError, 'request' | 'response'>>
> => {
  const options = defaultOptions || {};
  // set default type to default api base depending on options type if specified
  let client = new GraphQLClient(getAPIRequest());

  if ('client' in options) {
    // use custom client if specified
    client = options.client || client;
  } else if ('url' in options) {
    // use custom url if specified
    client = new GraphQLClient(options?.url);
  }

  const requestHeaders: RequestHeaders =
    'requestHeaders' in options ? options.requestHeaders : {};

  return async (
    { document, variables },
    { getState, endpoint, forced, type, extra }
  ) => {
    try {
      const prepareHeaders: PrepareHeaders =
        options.prepareHeaders ?? ((x) => x);

      const stateToken = (getState() as RootState).global.token;
      const token = stateToken;
      const stripRequestHeaders = stripRequestUndefined(requestHeaders);
      const stripTokenHeaders =
        token && !isPublicEndpoint(endpoint)
          ? { authorization: `Bearer ${token}` }
          : {};

      const allRequestHeader = {
        ...stripRequestHeaders,
        ...stripTokenHeaders,
      };
      const headers = new Headers(allRequestHeader);

      const preparedHeaders = await prepareHeaders(headers, {
        getState,
        endpoint,
        forced,
        type,
        extra,
      });

      return {
        data: await client.request({
          document,
          variables,
          requestHeaders: preparedHeaders,
        }),
        meta: {},
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const { name, stack, request, response } = error;

        const errorMessage = response?.errors?.[0]?.message;
        const errorStatusCode = response?.errors?.[0]?.extensions?.code;
        const message = formatErrorMessage(errorMessage, errorStatusCode);

        const customErrors =
          options.customErrors ?? (() => ({ name, message, stack }));

        const customizedErrors = customErrors(error) as E;

        return { error: customizedErrors, meta: { request, response } };
      }
      throw error;
    }
  };
};
