import React from 'react';
import { render } from '@testing-library/react';
import PostRequest, { PostRequestProps } from './PostRequest';

const props: PostRequestProps = {
  id: 10,
  title: 'this is the title',
  date: new Date(),
  content: 'this is the content',
  author: 'this is the author',
};

test('renders without crashing', () => {
  const { baseElement } = render(<PostRequest {...props} />);
  expect(baseElement).toBeDefined();
});

test('displays content properly', async () => {
  const { findByText } = render(<PostRequest {...props} />);
  await findByText('#10');
  await findByText('this is the title');
  await findByText('this is the content');
  await findByText('this is the author');
  await findByText('Approve');
  await findByText('Deny');
});

test('displays author as anonymous if omitted', async () => {
  const { findByText } = render(<PostRequest {...props} author={undefined} />);
  await findByText('Anonymous');
});
