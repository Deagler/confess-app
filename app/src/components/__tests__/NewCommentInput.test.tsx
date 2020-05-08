import React from 'react';
import { render } from '@testing-library/react';
import NewCommentInput from '../NewCommentInput';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';

jest.mock('../../services/firebase', () => {
  return {
    firebaseAnalytics: {
      logEvent: () => {},
      setScreenName: () => {},
      setUserId: () => {},
    },
  };
});

const props: any = {
  onCommentCreated: () => {},
  postId: '123',
};

test('renders without crashing', () => {
  const { baseElement } = render(
    <MockedProvider>
      <MemoryRouter>
        <NewCommentInput {...props} />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(baseElement).toBeDefined();
});
