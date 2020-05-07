import React from 'react';
import { render } from '@testing-library/react';
import { LogoutButton } from '../LogoutButton';
import { MockedProvider } from '@apollo/react-testing';

test('renders without crashing', () => {
  const { baseElement } = render(
    <MockedProvider>
      <LogoutButton showText={true} />
    </MockedProvider>
  );
  expect(baseElement).toBeDefined();
});

test('displays content properly', async () => {
  const { findByText } = render(
    <MockedProvider>
      <LogoutButton showText={true} />
    </MockedProvider>
  );
  await findByText('Logout');
});
