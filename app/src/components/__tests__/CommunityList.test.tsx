import React from 'react';
import { render } from '@testing-library/react';
import CommunityList from '../CommunityList';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';
import { GET_COMMUNITIES } from '../../common/graphql/communities';

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
        <CommunityList />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(baseElement).toBeDefined();
});

test('displays content properly', async () => {
  const { findByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <CommunityList />
      </MemoryRouter>
    </MockedProvider>
  );
  await findByText('More universities coming soon.');
});
