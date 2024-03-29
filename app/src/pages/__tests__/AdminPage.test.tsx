import React from 'react';
import { render } from '@testing-library/react';
import AdminPage from '../AdminPage';
import { wrapWithApolloProvider, wrapWithRouter } from '../../utils/testing';

jest.mock('../../services/firebase', () => {
  return {
    firebaseAnalytics: {
      logEvent: () => {},
      setScreenName: () => {},
      setUserId: () => {},
    },
  };
});

test('renders without crashing', () => {
  const tree = wrapWithApolloProvider(wrapWithRouter(<AdminPage />));

  const { baseElement } = render(tree);
  expect(baseElement).toBeDefined();
});
