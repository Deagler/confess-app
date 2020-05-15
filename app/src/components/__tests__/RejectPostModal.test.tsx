import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router-dom';
import RejectPostModal, { RejectPostModalProps } from '../RejectPostModal';
import { render } from '@testing-library/react';

const props: RejectPostModalProps = {
  postId: 'id',
  isOpen: true,
  onDidDismiss: () => null,
  onReject: () => null,
};

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
      <MemoryRouter>
        <RejectPostModal {...props} />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(baseElement).toBeDefined();
});
