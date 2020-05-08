import React from 'react';
import { render } from '@testing-library/react';
import { LoginInput } from '../LoginInput';
import { MockedProvider } from '@apollo/react-testing';

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
    <MockedProvider>
      <LoginInput />
    </MockedProvider>
  );
  expect(baseElement).toBeDefined();
});

test('displays content properly', async () => {
  const { findByText, findAllByText } = render(
    <MockedProvider>
      <LoginInput />
    </MockedProvider>
  );
  await findByText('Login');
  await findAllByText('Enter your university e-mail');
});
