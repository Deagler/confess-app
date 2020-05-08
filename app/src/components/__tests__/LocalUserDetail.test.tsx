import React from 'react';
import { render } from '@testing-library/react';
import { LocalUserDetail } from '../LocalUserDetail';

const props: any = {
  user: {
    id: 'abc',
    communityUsername: 'abc123',
    displayName: 'beaverknight',
    email: 'abc123@baduniversity.com',
    community: {
      id: 'def',
      name: 'bad university',
      abbreviation: 'bdu',
      imageURI: '/cat.png',
    },
    isAdmin: false,
  },
};

test('renders without crashing', () => {
  const { baseElement } = render(<LocalUserDetail {...props} />);
  expect(baseElement).toBeDefined();
});

test('displays content properly', async () => {
  const { findByText, findByAltText } = render(<LocalUserDetail {...props} />);
  await findByText('beaverknight');
  await findByText('bad university');
  await findByAltText('user avatar');
});
