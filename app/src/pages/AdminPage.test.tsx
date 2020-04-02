import React from 'react';
import { render } from '@testing-library/react';
import AdminPage from './AdminPage';
import { wrapWithApolloProvider } from '../utils/testing';

test('renders without crashing', () => {
  const tree = wrapWithApolloProvider(<AdminPage />);

  const { baseElement } = render(tree);
  expect(baseElement).toBeDefined();
});
