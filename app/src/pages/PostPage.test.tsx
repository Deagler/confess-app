import React from 'react';
import { render } from '@testing-library/react';
import PostPage from './PostPage';
import { wrapWithApolloProvider, wrapWithRouter } from '../utils/testing';

test('renders without crashing', () => {
  const { baseElement } = render(
    wrapWithApolloProvider(wrapWithRouter(<PostPage />))
  );
  expect(baseElement).toBeDefined();
});
