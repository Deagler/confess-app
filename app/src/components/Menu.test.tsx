import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Menu from './Menu';
import { MockedProvider } from '@apollo/react-testing';
import { GET_COMMUNITIES } from '../common/graphql/communities';
import { GET_SELECTED_COMMUNITY } from '../common/graphql/localState';

const mocks = [
  {
    request: {
      query: GET_SELECTED_COMMUNITY,
    },
    result: {
      data: {
        selectedCommunity: {
          id: '123',
          name: 'university',
          abbreviation: 'uni',
          imageURI: 'asdasd',
          channels: [
            {
              id: '456',
              name: 'my channel',
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GET_COMMUNITIES,
    },
    result: {
      data: {
        communities: [
          {
            id: '123',
            name: 'university',
            abbreviation: 'uni',
            channels: [
              {
                id: '456',
                name: 'my channel',
              },
            ],
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
        <Menu />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(baseElement).toBeDefined();
});
