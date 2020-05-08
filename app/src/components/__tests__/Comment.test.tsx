import React from 'react';
import { render } from '@testing-library/react';
import Comment, { CommentProps } from '../Comment';
import { wrapWithApolloProvider, wrapWithRouter } from '../../utils/testing';

jest.mock('../../services/firebase', () => {
  return {
    firebaseAnalytics: {
      logEvent: () => {},
      setScreenName: () => {},
      setUserId: () => {},
    },
    firebaseApp: {
      auth: () => ({}),
    },
  };
});

const props: CommentProps = {
  id: 'this is my id',
  creationTimestamp: 123456789,
  content: 'this is my content',
  totalLikes: 100,
  isCommentLikedByUser: true,
  isStarred: true,
  onReply: () => {},
  postIdForComment: 'this is the post id',
};

test('renders without crashing', () => {
  const { baseElement } = render(
    wrapWithApolloProvider(wrapWithRouter(<Comment {...props} />))
  );
  expect(baseElement).toBeDefined();
});

test('displays content properly', async () => {
  const { findByText } = render(
    wrapWithApolloProvider(wrapWithRouter(<Comment {...props} />))
  );
  await findByText('this is my content');
  await findByText('100');
});
