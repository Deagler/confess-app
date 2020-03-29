import React from 'react';
import { render } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from '../services/api/apolloClient';
import AdminPage from './AdminPage';

test('renders without crashing', () => {
  const tree = (
    <ApolloProvider client={apolloClient}>
      <AdminPage />
    </ApolloProvider>
  );

  const { baseElement } = render(tree);
  expect(baseElement).toBeDefined();
});
