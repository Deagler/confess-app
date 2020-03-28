import React from 'react';
import { render } from '@testing-library/react';
import FeedPage from './FeedPage';
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from '../services/api/apolloClient';

test('renders without crashing', () => {
  const tree = (
    <ApolloProvider client={apolloClient}>
      <FeedPage />
    </ApolloProvider>
  );
  const { baseElement } = render(tree);
  expect(baseElement).toBeDefined();
});
