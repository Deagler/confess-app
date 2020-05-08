import React from 'react';
import { render } from '@testing-library/react';
import PostSkeleton from '../PostSkeleton';

test('renders without crashing', () => {
  const { baseElement } = render(<PostSkeleton />);
  expect(baseElement).toBeDefined();
});
