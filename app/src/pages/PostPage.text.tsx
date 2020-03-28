import React from 'react';
import { render } from '@testing-library/react';
import PostPage from './PostPage';

test('renders without crashing', () => {
  const { baseElement } = render(<PostPage />);
  expect(baseElement).toBeDefined();
});
