import { Router } from 'react-router';
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from '../services/api/apolloClient';
import { createMemoryHistory } from 'history';
import React from 'react';

export function wrapWithRouter(children: JSX.Element, historyConf = {}) {
  const history = createMemoryHistory(historyConf);
  return <Router history={history}>{children}</Router>;
}

export function wrapWithApolloProvider(children: JSX.Element) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
