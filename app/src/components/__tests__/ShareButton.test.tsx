import { MockedProvider, wait } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';
import ShareButton from '../ShareButton';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';

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
  const { container } = render(
    <MockedProvider>
      <MemoryRouter>
        <ShareButton title="title" target="url" />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(container).toBeDefined();
});

test('share button renders pop up and copies link', async () => {
  document.execCommand = jest.fn();

  const { getByTestId, findByText } = render(
    <MockedProvider>
      <MemoryRouter>
        <ShareButton title="title" target="url" />
      </MemoryRouter>
    </MockedProvider>
  );

  const button = getByTestId('share-button');

  fireEvent.click(button);

  await wait(0);

  await findByText('Share link copied to clipboard');
  expect(document.execCommand).toHaveBeenCalledWith('copy');
});
