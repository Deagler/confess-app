import React from 'react';
import { render } from '@testing-library/react';
import Post from './Post';

const props = {
  id: 10,
  title: 'this is the title',
  date: new Date(),
  content: 'this is the content',
  author: 'this is the author',
};

test('renders without crashing', () => {
  const { baseElement } = render(<Post {...props} />);
  expect(baseElement).toBeDefined();
});

test('displays content properly', async () => {
  const { findByText } = render(<Post {...props} />);
  await findByText('#10');
  await findByText('this is the title');
  await findByText('this is the content');
  await findByText('this is the author');
});

test('displays author as anonymous if omitted', async () => {
  const { findByText } = render(<Post {...props} author={undefined} />);
  await findByText('Anonymous');
});
