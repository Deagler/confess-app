import React from 'react';
import { render } from '@testing-library/react';
import Post, { PostProps } from './Post';
import { MemoryRouter } from 'react-router-dom';

const props: PostProps = {
  id: 10,
  title: 'this is the title',
  creationTimestamp: Math.round(new Date().getTime() / 1000), // unix timestamp
  content: 'this is the content',
  authorAlias: 'this is the author',
  onCommentClick: () => null,
};

test('renders without crashing', () => {
  const { baseElement } = render(
    <MemoryRouter>
      <Post {...props} />
    </MemoryRouter>
  );
  expect(baseElement).toBeDefined();
});

test('displays content properly', async () => {
  const { findByText } = render(
    <MemoryRouter>
      <Post {...props} />
    </MemoryRouter>
  );
  await findByText('this is the title');
  await findByText('this is the content');
  await findByText('this is the author');
});

test('displays author as anonymous if omitted', async () => {
  const { findByText } = render(
    <MemoryRouter>
      <Post {...props} authorAlias={undefined} />
    </MemoryRouter>
  );
  await findByText('Anonymous');
});
