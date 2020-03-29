import React from 'react';
import { render } from '@testing-library/react';
import FeedPage from './FeedPage';
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from '../services/api/apolloClient';
import { Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';

function wrapWithRouter(children: JSX.Element, historyConf = {}) {
  const history = createMemoryHistory(historyConf);
  return <Router history={history}>{children}</Router>;
}

function wrapWithApolloProvider(children: JSX.Element) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}

test('renders without crashing', () => {
  const { baseElement } = render(
    wrapWithApolloProvider(
      wrapWithRouter(<Route render={(props) => <FeedPage {...props} />} />)
    )
  );
  expect(baseElement).toBeDefined();
});
