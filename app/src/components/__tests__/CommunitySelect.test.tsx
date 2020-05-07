import React from 'react';
import { render } from '@testing-library/react';
import CommunitySelect from '../CommunitySelect';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';
import { GET_COMMUNITIES } from '../../common/graphql/communities';

jest.mock('../../services/firebase', () => {
  return {
    firebaseAnalytics: {
      logEvent: () => {},
      setScreenName: () => {},
      setUserId: () => {},
    },
  };
});

const mocks = [
  {
    request: {
      query: GET_COMMUNITIES,
    },
    result: {
      data: {
        communities: [
          {
            id: '123',
            name: 'very cool university',
            abbreviation: 'uni',
            isEnabled: true,
          },
        ],
      },
    },
  },
];

test('renders without crashing', () => {
  const { baseElement } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <CommunitySelect />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(baseElement).toBeDefined();
});

test('displays content properly', async () => {
  const { findAllByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <CommunitySelect />
      </MemoryRouter>
    </MockedProvider>
  );
  await findAllByText('Select a University');
});
