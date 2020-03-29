import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Menu from './Menu';
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from '../services/api/apolloClient';

test('renders without crashing', () => {
  const { baseElement } = render(
    <ApolloProvider client={apolloClient}>
      <MemoryRouter>
        <Menu selectedPage="feed" />
      </MemoryRouter>
    </ApolloProvider>
  );
  expect(baseElement).toBeDefined();
});

test('displays content properly', async () => {
  const { findByText } = render(
    <ApolloProvider client={apolloClient}>
      <MemoryRouter>
        <Menu selectedPage="feed" />
      </MemoryRouter>
    </ApolloProvider>
  );
  await findByText('Confess');
  await findByText('LogIn');
  await findByText('SignUp');
});
