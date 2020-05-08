import React from 'react';
import { render } from '@testing-library/react';
import ChannelList from '../ChannelList';
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
  const { baseElement } = render(
    wrapWithApolloProvider(wrapWithRouter(<ChannelList />))
  );
  expect(baseElement).toBeDefined();
});

test('displays content properly', async () => {
  const { findByText } = render(
    wrapWithApolloProvider(wrapWithRouter(<ChannelList />))
  );
  await findByText('All');
});
