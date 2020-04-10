import React from 'react';
import { render } from '@testing-library/react';
import PostPage from './PostPage';
import {
  wrapWithApolloProvider,
  wrapWithRouter,
 
} from '../utils/testing';

jest.mock('../services/firebase', () => {
  return {
    firebaseAnalytics: {
      logEvent: () => {},
      setScreenName: () => {},
      setUserId: () => {},
    },
  };
});

test('renders without crashing', () => {
  const { baseElement } = render(
    wrapWithApolloProvider(wrapWithRouter(<PostPage />))
  );
  expect(baseElement).toBeDefined();
});
