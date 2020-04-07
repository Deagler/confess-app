import React from 'react';
import { render } from '@testing-library/react';
import Post, { PostProps } from './Post';
import { MemoryRouter } from 'react-router-dom';
import { wrapWithApolloProvider } from '../utils/testing';

const props: PostProps = {
  id: 'id',
  postNumber: 1,
  title: 'this is the title',
  creationTimestamp: Math.round(new Date().getTime() / 1000), // unix timestamp
  content: 'this is the content',
  authorAlias: 'this is the author',
  totalLikes: 7,
  totalComments: 56,
  onCommentClick: () => null,
  isLikedByUser: false,
  collapsable: false,
};

test('renders without crashing', () => {
  const { baseElement } = render(
    wrapWithApolloProvider(
      <MemoryRouter>
        <Post {...props} />
      </MemoryRouter>
    )
  );
  expect(baseElement).toBeDefined();
});

test('displays content properly', async () => {
  const { findByText } = render(
    wrapWithApolloProvider(
      <MemoryRouter>
        <Post {...props} />
      </MemoryRouter>
    )
  );
  await findByText('#1');
  await findByText('this is the title');
  await findByText('this is the content');
  await findByText('this is the author');
  await findByText('7');
  await findByText('56');
});

test('displays author as anonymous if omitted', async () => {
  const { findByText } = render(
    wrapWithApolloProvider(
      <MemoryRouter>
        <Post {...props} authorAlias={undefined} />
      </MemoryRouter>
    )
  );
  await findByText('Anonymous');
});
