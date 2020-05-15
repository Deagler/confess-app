import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';
import { WebHeader } from '../WebHeader';
import { render } from '@testing-library/react';
import React from 'react';
import { GET_LOCAL_USER } from '../../common/graphql/localState';

const mocks = [
  {
    request: { query: GET_LOCAL_USER },
    result: { data: { localUser: { id: '1' } } },
  },
];

jest.mock('../../services/firebase', () => {
  return {
    firebaseAnalytics: {
      logEvent: () => {},
      setScreenName: () => {},
      setUserId: () => {},
    },
  };
});

test('does not render menu', () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/']}>
        <WebHeader />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(container).toBeEmpty();
});

test('renders menu', () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/id/posts']}>
        <WebHeader />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(container).not.toBeEmpty();
});
