import React from 'react';
import { render } from '@testing-library/react';
import FeedPage from './FeedPage';
import { Route } from 'react-router';
import { wrapWithApolloProvider, wrapWithRouter } from '../utils/testing';
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
    wrapWithApolloProvider(
      wrapWithRouter(<Route render={(props) => <FeedPage {...props} />} />)
    )
  );
  expect(baseElement).toBeDefined();
});
