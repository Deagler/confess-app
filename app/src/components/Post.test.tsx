import React from 'react';
import { render } from '@testing-library/react';
import Post, { PostProps } from './Post';
import { MemoryRouter } from 'react-router-dom';

const props: PostProps = {
  id: 10,
  title: 'this is the title',
  date: new Date(),
  content: 'this is the content',
  author: 'this is the author',
  onCommentClick: () => null,
};

test('renders without crashing', () => {
  const { baseElement } = render(
    <MemoryRouter>
      <Post {...props} />{' '}
    </MemoryRouter>
  );
  expect(baseElement).toBeDefined();
});

test('displays content properly', async () => {
  const { findByText } = render(
    <MemoryRouter>
      <Post {...props} />{' '}
    </MemoryRouter>
  );
  await findByText('#10');
  await findByText('this is the title');
  await findByText('this is the content');
  await findByText('this is the author');
});

test('displays author as anonymous if omitted', async () => {
  const { findByText } = render(
    <MemoryRouter>
      <Post {...props} author={undefined} />
    </MemoryRouter>
  );
  await findByText('Anonymous');
});
