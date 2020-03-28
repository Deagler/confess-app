import React from 'react';
import { render } from '@testing-library/react';
import Post, { PostProps } from './Post';

const props: PostProps = {
  id: 10,
  title: 'this is the title',
  creationTimestamp: Math.round(new Date().getTime() / 1000), // unix timestamp
  content: 'this is the content',
  authorName: 'this is the author',
};

test('renders without crashing', () => {
  const { baseElement } = render(<Post {...props} />);
  expect(baseElement).toBeDefined();
});

test('displays content properly', async () => {
  const { findByText } = render(<Post {...props} />);
  await findByText('this is the title');
  await findByText('this is the content');
  await findByText('this is the author');
});

test('displays author as anonymous if omitted', async () => {
  const { findByText } = render(<Post {...props} authorName={undefined} />);
  await findByText('Anonymous');
});
