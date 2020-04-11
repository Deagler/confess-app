import React from 'react';
import { render } from '@testing-library/react';
import PostRequest, { PostRequestProps } from './PostRequest';
import { wrapWithApolloProvider, wrapWithRouter } from '../utils/testing';
import moment from 'moment';

const props: PostRequestProps = {
  id: '10',
  title: 'this is the title',
  creationTimestamp: moment().unix(),
  content: 'this is the content',
  authorAlias: 'this is the author',
  onModeration: () => {},
};

jest.mock('../services/firebase', () => {
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
    wrapWithApolloProvider(wrapWithRouter(<PostRequest {...props} />))
  );
  expect(baseElement).toBeDefined();
});

test('displays content properly', async () => {
  const { findByText } = render(
    wrapWithApolloProvider(wrapWithRouter(<PostRequest {...props} />))
  );
  await findByText('Post ID: 10');
  await findByText('this is the title');
  await findByText('this is the content');
  await findByText('~ this is the author');
  await findByText('Approve');
  await findByText('Reject');
});

test('displays author as anonymous if omitted', async () => {
  const { findByText } = render(
    wrapWithApolloProvider(
      wrapWithRouter(<PostRequest {...props} authorAlias={null} />)
    )
  );
  await findByText('~ Anonymous');
});
