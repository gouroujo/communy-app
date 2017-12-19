import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { toIdValue } from 'apollo-utilities';
import cookie from 'cookie'

import fetch from 'isomorphic-unfetch'

import dataIdFromObject from './dataIdFromObject';

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create (initialState, { getToken }) {
  const httpLink = new BatchHttpLink({
    uri: process.browser ? `${window.__ENV__.ENDPOINT}/graphql` : `${process.env.SSR_ENDPOINT}/graphql`,
    credentials: 'same-origin'
  })

  const ErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) {
      if (!networkError.response) {
        return console.log(`[Network error : no response]: ${networkError}`);
      }
      console.log(`[Network error (${networkError.response.status})]: ${networkError}`);
      // console.log(networkError.response.status)
      if (networkError.response && networkError.response.status === 401) {
        if (process.browser) {
          document.cookie = cookie.serialize('token', '', {
            path: '/',
            expires: 0 // Expire the cookie immediately
          })
          window.location.reload()
        }
      }
    }
  })

  const AuthLink = new ApolloLink((operation, forward) => {
    const token = getToken()
    operation.setContext(({ headers }) => ({
      headers: {
        ...headers,
        'Authorization': token ? `${token}` : null
      }
    }));
    return forward(operation);
  });

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([
      ErrorLink,
      AuthLink,
      httpLink
    ]),
    cache: new InMemoryCache({
      cacheResolvers: {
        Query: {
          event: (_, { id }) => toIdValue(dataIdFromObject({ __typename: 'Event', id })),
          organisation: (_, { id }) => toIdValue(dataIdFromObject({ __typename: 'Organisation', id })),
          user: (_, { id }) => toIdValue(dataIdFromObject({ __typename: 'User', id })),
        },
      },
      dataIdFromObject,
    }).restore(initialState || {}),
  })
}

export default function initApollo (initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options)
  }

  return apolloClient
}
